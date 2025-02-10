import { ConfigModule } from '@nestjs/config';

export const config = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: './.env',
});
