import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Stamping, StampingSchema } from './schemas/stampings.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(
      'mongodb://' +
      process.env.DB_USER +
      ':' +
      process.env.DB_PWD +
      '@' +
      'database/stampings',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    MongooseModule.forFeature([
      { name: Stamping.name, schema: StampingSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
