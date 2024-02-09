import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string
}
