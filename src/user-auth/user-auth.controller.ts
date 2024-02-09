import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param } from '@nestjs/common'
import { UserAuthService } from './user-auth.service'
import { User } from './schemas/user-auth.schema'
import { AuthGuard } from './auth.guard'

// Dtos
import { UpdateUserDto, RegisterDto } from './dto'

// Helpers

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    console.log("INI REGISTER DTO => ", registerDto)
    return await this.userAuthService.registerUser(registerDto)
  }

  @Post('login')
  async loginUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body
    return await this.userAuthService.loginUser(email, password)
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers() {
    return this.userAuthService.getUsers()
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@Request() req) {
    const userId = req.user.userId
    return this.userAuthService.getUser(userId)
  }

  @Patch('user')
  @UseGuards(AuthGuard)
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId
    return this.userAuthService.updateUser(userId, updateUserDto)
  }
}