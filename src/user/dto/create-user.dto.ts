import { Contains, IsEmail, IsNotEmpty, IsNumberString, IsOptional, Length } from 'class-validator';
export class CreateUserDto {

    @IsNotEmpty() @Length(4)
    readonly username : string;
    @IsNotEmpty()
    readonly first_name : string;
    @IsNotEmpty()
    readonly last_name : string;
    @IsNotEmpty() @IsEmail()
    readonly email:string;
    @IsNotEmpty() @Length(6)
    readonly password:string;

}
