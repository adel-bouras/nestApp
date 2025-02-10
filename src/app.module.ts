import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { config } from './config/env.config';
import { DBRoot } from './config/db.config';
import { jwtconfig } from './config/jwt.config';

@Module({
  imports: [UserModule, AuthModule, config, DBRoot, jwtconfig],
})
export class AppModule {}
