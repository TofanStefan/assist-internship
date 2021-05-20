import { ApiProperty } from '@nestjs/swagger';
import { Contains, IsEmail, IsNotEmpty, IsNumberString, IsOptional, Length } from 'class-validator';
export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty() @Length(4)
    readonly username : string;
    @ApiProperty()
    @IsNotEmpty()
    readonly first_name : string;
    @ApiProperty()
    @IsNotEmpty()
    readonly last_name : string;
    @ApiProperty()
    @IsNotEmpty() @IsEmail()
    readonly email:string;
    @ApiProperty()
    @IsNotEmpty() @Length(6)
    readonly password:string;

}
