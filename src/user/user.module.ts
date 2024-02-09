import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { secretKey } from './config'; 

// Helpers
import { ResponseHelper } from '../common/response.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ResponseHelper],
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   }
}