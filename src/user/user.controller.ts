import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthGuard } from './auth.guard'

// Dtos
import { UpdateUserDto, RegisterDto } from './dto'

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getUser(@Request() req) {
    const userId = req.user.userId
    return this.userService.getUser(userId)
  }
 
  @Get('search')
  async getUsers(@Query('name') name: string) {
    console.log("MASUK LER")
    return this.userService.getUserSearch(name)
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUser(id)
  }


  @Patch('')
  @UseGuards(AuthGuard)
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId
    return this.userService.updateUser(userId, updateUserDto)
  }

  @Post('auth/register')
  async registerUser(@Body() registerDto: RegisterDto) {
    return await this.userService.registerUser(registerDto)
  }

  @Post('auth/login')
  async loginUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body
    return await this.userService.loginUser(email, password)
  }
}