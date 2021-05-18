import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
const strava = require("strava-v3")

@Injectable()
export class StravaAuthService {
  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>){}
  
  // creates and return an access request uri = > redirect to strava outh
 async requestAccess():Promise<string>{
  strava.config({
    client_id : process.env.STRAVA_CLIENT_ID,
    redirect_uri : process.env.STRAVA_CLIENT_URI,
    client_secret : process.env.STRAVA_CLIENT_SECRET
  })

  try{
    // grant types 
    const scopes = "profile:write,profile:read_all,read_all,activity:read_all,activity:write"
    const url = await strava.oauth.getRequestAccessURL({scope:scopes})
    return url
  }catch(error){
    throw new InternalServerErrorException(error);
  }
}

// handles strava auth response = > if user exists update refresh token else 
//create new user 

async saveAccess(code:string,scope:string):Promise<void>{

  try{
    const token_exchange = await strava.oauth.getToken(code);
    console.log(token_exchange)
    // search for a user with the strava id 
    const user  = await this.userRepository.findOne({strava_id:token_exchange.athlete.id});
    // user exists = > update refresh and access token 
    if(user){
      const updateUser = this.userRepository.create(
        {
          access_token:token_exchange.access_token,
          refresh_token:token_exchange.refresh_token
      }); 
      await this.userRepository.update({strava_id : token_exchange.athlete.id},updateUser)
    } // user does not exist => create user 
    else
    {
      const createUser  = this.userRepository.create(
        {
          access_token:token_exchange.access_token,
          refresh_token:token_exchange.refresh_token,
          strava_id : token_exchange.athlete.id,
          first_name : token_exchange.athlete.firstname,
          last_name : token_exchange.athlete.lastname,
        }
      )

      // create user  
      await this.userRepository.save(createUser);

    }
  }catch(error){
    throw new InternalServerErrorException(error)
  }
  
  
}

}
