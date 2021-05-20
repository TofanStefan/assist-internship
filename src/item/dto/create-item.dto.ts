import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
export class CreateItemDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name : string;
    @ApiProperty()
    @IsOptional() @IsNotEmpty()
    readonly description? : string;
    @ApiProperty()
    @IsNumberString()
    readonly quantity : number
}
