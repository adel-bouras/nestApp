import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userservice: UserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userservice.ValidateUser(email, password);
      return user;
    } catch (e) {
      return;
    }
  }
}
