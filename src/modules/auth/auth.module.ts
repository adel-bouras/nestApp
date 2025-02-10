import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { localStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { DBFeature } from 'src/config/db.config';
import { User, userschema } from '../schemas/user.schema';

@Module({
  imports: [UserModule, DBFeature([{ name: User.name, schema: userschema }])],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, jwtStrategy],
})
export class AuthModule {}
