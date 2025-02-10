import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/user.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LogininDto } from './dto/user.login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private user: Model<User>,
    private jwt: JwtService,
  ) {}

  async register(body: registerDto) {
    const user = new this.user({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });
    await user.save();
    const { password, ...data } = user.toObject();

    return {
      data,
      token: this.jwt.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }

  async login(body: LogininDto) {
    const user = await this.user.findOne({ email: body.email });
    const { password, ...data } = user.toObject();
    return {
      data,
      token: this.jwt.sign({ id: user.id, email: user.email }),
    };
  }
}
