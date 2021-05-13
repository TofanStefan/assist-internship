import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
export class CreateItemDto {
    @IsNotEmpty()
    readonly name : string;
    @IsOptional() @IsNotEmpty()
    readonly description? : string;
    @IsNumberString()
    readonly quantity : number
}
