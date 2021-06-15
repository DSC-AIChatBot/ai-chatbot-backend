import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './models/auth/auth.module';
import { EmotionCalendarModule } from './models/emotion-calendar/emotion-calendar.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app/configuration.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './models/chat/chat.module';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    ChatModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      subscriptions: {
        keepAlive: 5000,
      },
    }),
    EmotionCalendarModule,
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://dscchatbot:dscchatbot1234@cluster0.6zung.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
