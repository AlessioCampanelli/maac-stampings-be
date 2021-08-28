import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    constructor(email: string, pwd: string) {
        this.email = email;
        this.pwd = pwd;
    }

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    pwd: string;

}