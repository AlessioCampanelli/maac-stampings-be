import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    
    constructor(@InjectModel('User')
                private userModel: Model<User>) {
    }   

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email: email }).exec()
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save()
    }
}


