import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DBFeature } from 'src/config/db.config';
import { User, userschema } from '../schemas/user.schema';

@Module({
  imports: [DBFeature([{ name: User.name, schema: userschema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
