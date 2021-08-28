import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sha256, { Hash, HMAC } from "fast-sha256";
import { UsersService } from 'src/user/users.service';
import { CreateUserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {

    constructor(
      private usersService: UsersService,
      private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
      
      const user = await this.usersService.findOne(email);

      let enc = new TextEncoder();
      let uint8EncodedPwd = enc.encode(password);
      let hashedPwd = sha256(uint8EncodedPwd);

      let hashedPwdString = new TextDecoder("utf-8").decode(hashedPwd);

      return (hashedPwdString == user.pwd) ? user : null
    }

    async login(user: any) {
      const payload = { username: user.email, sub: "" };
      return {
        username: user.email,
        access_token: this.jwtService.sign(payload)
      };
    }

    async create(user: CreateUserDto): Promise<any> {

      let enc = new TextEncoder();
      let uint8EncodedPwd = enc.encode(user.pwd);
      let hashedPwd = sha256(uint8EncodedPwd);
      let hashedPwdString = new TextDecoder("utf-8").decode(hashedPwd);
      user.pwd = hashedPwdString
      const result = await this.usersService.create(user);
      return { id: result.id }
    }
}
