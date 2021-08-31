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

    async getStampings(id_user: string): Promise<any> {
      return new Promise(resolve => {
        let controller = new AuhtFirebaseController();
        controller.listStampings(id_user).then(response => {

          var stampings = [];

          response.forEach(stamp => {
            let id_doc = stamp._ref._path.segments.length > 1 ? stamp._ref._path.segments[1] : '';
            let fieldsProto = stamp._fieldsProto;

            let startStamp = fieldsProto.start_stamped_time;
            let endStamp = fieldsProto.end_stamped_time;
            let id_user = fieldsProto.id_user;
            let subtitle = fieldsProto.subtitle;
            let start_time = fieldsProto.start_time;
            let end_time = fieldsProto.end_time;
            let title = fieldsProto.title;
            let address = fieldsProto.address;

            let st = {
              id_doc: id_doc,
              start_stamped_time: startStamp.timestampValue != undefined ? startStamp.timestampValue.seconds : null,
              end_stamped_time: endStamp.timestampValue != undefined ? endStamp.timestampValue.seconds : null,
              subtitle: subtitle != undefined ? subtitle.stringValue : null,
              start_time: start_time.timestampValue != undefined ? start_time.timestampValue.seconds : null,
              end_time: end_time.timestampValue != undefined ? end_time.timestampValue.seconds : null,
              id_user: id_user != undefined ? id_user.stringValue : null,
              title: title != undefined ? title.stringValue : null,
              address: address != undefined ? address.stringValue : null
            }

            stampings.push(st);
          });

          resolve({
            stampings: stampings// response
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
