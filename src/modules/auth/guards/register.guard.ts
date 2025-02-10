import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/schemas/user.schema';

export class registerGuard implements CanActivate {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().body;
    const exist = await this.user.findOne({ email: user.email });
    if (exist) {
      throw new BadRequestException('user alrady exists.');
    }
    return true;
  }
}
