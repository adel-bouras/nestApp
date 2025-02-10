import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DBFeature } from 'src/config/db.config';
import { User, userschema } from '../schemas/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { jwtGuard } from '../auth/guards/jwt.strategy.guard';

@Module({
  imports: [DBFeature([{ name: User.name, schema: userschema }])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: jwtGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
