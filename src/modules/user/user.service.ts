import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}
  async getuser(_id: ObjectId) {
    const user = await this.user.findById(_id);
    if (user) {
      const { password, ...data } = user.toObject();
      return data;
    }
    return null;
  }

  async ValidateUser(email: string, password: string) {
    const user = await this.user.findOne({ email });
    if (!user) throw new BadRequestException('user not found');
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...data } = user.toObject();
      return data;
    }
    throw new BadRequestException('email or password are incorrect.');
  }
}
