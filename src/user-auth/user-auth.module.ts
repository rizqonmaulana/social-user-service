import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user-auth.schema';

// Helpers
import { ResponseHelper } from '../common/response.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, ResponseHelper],
})

export class UserAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   }
}