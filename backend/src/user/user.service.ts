import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dto/userDto';
import { loginUserDto } from 'src/dto/loginUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createCatDto: CreateUserDto): Promise<CreateUserDto|any> {
    console.log("hai");
    const {email} = createCatDto
    const user = await this.userModel.findOne({email}).exec();
    if(user){
      return {error:"user already exist"}
    }

    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

 
  async login({email,password}): Promise<User> {

    const user = await this.userModel.findOne({ email, password }).exec();

    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
