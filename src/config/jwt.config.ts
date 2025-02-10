import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const jwtconfig = JwtModule.registerAsync({
  global: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: '5h',
    },
  }),
});
