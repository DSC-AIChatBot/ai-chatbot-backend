import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/auth/auth.model';
import { MongoService } from './mongo.service';

@Module({
    imports:[
        HttpModule,
    ],
    providers:[MongoService],
    exports: [MongoService]
})

export class MongoModule{}