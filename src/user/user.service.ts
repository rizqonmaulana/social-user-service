import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

// Dtos
import { UpdateUserDto, RegisterDto } from './dto'

@Injectable()
export class UserService {
    constructor( 
        @InjectModel(User.name) 
        private userModel: Model<User>, 
        private jwtService: JwtService,
    ) {}
   
    async registerUser(registerDto: RegisterDto) {
      try {
        const { email, password, name } = registerDto
        
        const existingUser = await this.userModel.findOne({ email: email })
        if (existingUser) {
          throw new ConflictException('User with this email already exists, please try another email to register')
        }

         // If no user found, proceed with user registration
        const hash = await bcrypt.hash(password, 10)
        const newUser = await this.userModel.create({ email, name, password: hash })
        const userObject = newUser.toObject()    
        delete userObject.password

        return userObject
      } catch (error) {
        if (error instanceof ConflictException) {
            throw error
        }

        throw new Error('An error occurred while registering the user')
      }
    }
  
    async loginUser(email: string, password: string) {
      try {
        const user = await this.userModel.findOne({ email })
        if (!user) {
          throw new NotFoundException('User not found')
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
          throw new UnauthorizedException('Invalid login credentials')
        }
        const payload = { userId: user._id }
        const token = this.jwtService.sign(payload) 

        return { token: token }
      } catch (error) {
        if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
            throw error
        }

        throw new UnauthorizedException('An error occurred while logging in')
      }
    }
  
    async getUsers(){
      try {
        const users = await this.userModel.find({})
        return users
      } catch (error) {
        throw new Error('An error occurred while retrieving users')
      }
    }

    async getUser(userId : string){
        try {
          const user = await this.userModel.find({ _id:userId }).select('-password -createdAt -updatedAt')
          return user[0]
        } catch (error) {
          throw new Error('An error occurred while retrieving user')
        }
    }

    async getUserSearch(name : string){
      try {
        const regex = new RegExp(name, 'i'); // 'i' option for case-insensitive search
        return await this.userModel.find({ name: { $regex: regex } }).select('-password -createdAt -updatedAt').exec();
      } catch (error) {
        throw new Error('An error occurred while retrieving user')
      }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        try {
          return await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).select('-password')
        } catch (error) {
          throw new Error('An error occurred while updating the user')
        }
    }
  }
