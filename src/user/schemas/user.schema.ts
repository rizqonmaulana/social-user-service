import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string
  @Prop()
  password: string
  @Prop()
  name: string
  @Prop()
  profilePictureUrl: string
  @Prop()
  bio: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)