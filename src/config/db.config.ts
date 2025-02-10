import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DBRoot = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('MONGODB_URL'),
  }),
});

export const DBFeature = (Props: [{ name: string; schema: any }]) =>
  MongooseModule.forFeature(Props);
