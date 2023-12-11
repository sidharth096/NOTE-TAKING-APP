import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
const MONGO_URL ='mongodb+srv://sidharthtp096:sidharthtp096@note.hg4yxxv.mongodb.net/'


 

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath :'.env'
  }),
           MongooseModule.forRoot(MONGO_URL),
           UserModule,NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
