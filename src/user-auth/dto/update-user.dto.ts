import { IsUrl, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
    
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsUrl()
    profilePictureUrl?: string

    @IsOptional()
    @IsString()
    bio?: string
  }