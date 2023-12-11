// user.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/userDto';
import { loginUserDto } from 'src/dto/loginUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      console.log("2222");
      
      console.log(error);
      
    }
    
  }

  @Post('login')
  async login(@Body() loginUserDto: loginUserDto) {
    try {
     const user= await this.userService.login(loginUserDto);
     return user
    } catch (error) {
      return   {error:error.message}
    }
   
  }

  @Get('h')
  async findAll() {
    return this.userService.findAll();
  }
}
