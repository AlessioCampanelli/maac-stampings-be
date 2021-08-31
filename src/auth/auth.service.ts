import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sha256, { Hash, HMAC } from "fast-sha256";
import { UsersService } from 'src/user/users.service';
import { CreateUserDto } from 'src/user/user.dto';
import { AuhtFirebaseController } from 'src/auth-firebase/auht-firebase/auht-firebase.controller';
import { User } from 'src/user/user.interface';
import { StampingDto } from 'src/stampings/stamping.interface';
@Injectable()
export class AuthService {

    constructor(
      private usersService: UsersService,
      private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User> {
      
      const user = await this.usersService.findOne(email);

      let enc = new TextEncoder();
      let uint8EncodedPwd = enc.encode(password);
      let hashedPwd = sha256(uint8EncodedPwd);

      let hashedPwdString = new TextDecoder("utf-8").decode(hashedPwd);

      return (user != null && hashedPwdString == user.pwd) ? user : null
    }

    async login(request: any) {
      const payload = { username: request.body.username };
      return new Promise(async resolve => {
        const userFound = await this.validateUser(request.body.username, request.body.password);
        let controller = new AuhtFirebaseController();
        controller.createJwt().then(accessToken => {
          resolve({
            id_user: userFound._id,
            username: request.email,
            jwt_token: this.jwtService.sign(payload),
            firebase_token: accessToken
          });
          return;
        });  
      }); 
    }

    async loginFirebase(user: any): Promise<any> {
      let email = user.user.email;
      return new Promise(resolve => {
        let controller = new AuhtFirebaseController();
        controller.createJwt().then(accessToken => {
          resolve({
            username: email,
            jwt_token: accessToken
          });
          return;
        });  
      });    
    }

    async createStamping(stamping: StampingDto): Promise<any> {
      return new Promise(resolve => {
        let controller = new AuhtFirebaseController();
        controller.createStamping(stamping).then(response => {
          resolve({
            isCreated: response
          });
          return;
        });  
      });    
    }

    async getStampings(req: any): Promise<any> {
      const payload = { id_user: req.body.id_user };
      return new Promise(resolve => {
        let controller = new AuhtFirebaseController();
        controller.listStampings(payload.id_user).then(response => {
          resolve({
            stampings: response
          });
          return;
        });  
      });    
    }

    async deleteStamping(req: any): Promise<any> {
      console.log('deleteStamping req', req);
      return new Promise(resolve => {
        let controller = new AuhtFirebaseController();
        controller.deleteStamping(req.id_stamping).then(response => {
          resolve({
            isDeleted: response
          });
          return;
        });  
      });    
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
