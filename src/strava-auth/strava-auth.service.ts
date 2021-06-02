import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import * as moment from 'moment'
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
    const users = await strava.athlete.get({ access_token: token_exchange.access_token })
    console.log(users)
    // search for a user with the strava id 
    const user  = await this.userRepository.findOne({strava_id:token_exchange.athlete.id});
    // user exists = > update refresh and access token 
    if(user){
      const expires_at =  moment().add(Number(token_exchange.expires_in), 'seconds'). format('yyyy-MM-DD:hh:mm A')
      const update = new User(new Date(expires_at),token_exchange.refresh_token,token_exchange.access_token)
      await this.userRepository.update({strava_id : token_exchange.athlete.id},update)
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
          expires_at : moment().add(Number(token_exchange.expires_in), 'seconds'). format('yyyy-MM-DD:hh:mm A')
        }
      )

      // create user  
      await this.userRepository.save(createUser);

    }
  }catch(error){
    throw new InternalServerErrorException(error)
  }
  
  
}

async refreshToken (user : User) : Promise<any>{
    try{
       
      const refreshed =  await strava.oauth.refreshToken(user.refresh_token);
      // calculates expiration date and updates user with refresh , date and access token 
      const expires_at =  moment().add(Number(refreshed.expires_in), 'seconds'). format('yyyy-MM-DD:hh:mm A')
      const update = new User(new Date(expires_at),refreshed.refresh_token,refreshed.access_token);
      await this.userRepository.update({strava_id:user.strava_id},update);
      
      return refreshed.access_token;

    }catch(error){
      throw new ForbiddenException(error)
    }
  } 


  async getAccessToken(strava_id:number) : Promise<string>{
    try{
      
      const user = await this.userRepository.findOneOrFail({strava_id})
      let access_token = user.access_token;
      // if access token is expired  = > refresh  else => return access token
      if(moment() > moment(user.expires_at))
         access_token  =  await this.refreshToken(user);

      return access_token;
      
   }catch(error){

     throw new NotFoundException(error)
   }

  }
}
