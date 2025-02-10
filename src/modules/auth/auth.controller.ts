import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { registerGuard } from './guards/register.guard';
import { localGuard } from './guards/local.strategy.guard';
import { register, registerDto } from './dto/user.create.dto';
import { login, type LogininDto } from './dto/user.login.dto';
import { zodPipe } from 'src/globalPipes/Zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @UseGuards(registerGuard)
  @UsePipes(new zodPipe(register))
  @Post('register')
  async register(@Body() body: registerDto, @Res() res: Response) {
    const response = await this.authservice.register(body);
    res
      .status(201)
      .cookie('token', response.token, {
        httpOnly: true,
      })
      .json({ message: 'user created successfully.', data: response.data });
  }

  @UseGuards(localGuard)
  @UsePipes(new zodPipe(login))
  @Post('login')
  async login(@Body() body: LogininDto, @Res() res: Response) {
    const response = await this.authservice.login(body);
    const token = response.token;
    res
      .status(200)
      .cookie('token', token)
      .json({ message: 'user loggedin successfully.', data: response.data });
  }
}
