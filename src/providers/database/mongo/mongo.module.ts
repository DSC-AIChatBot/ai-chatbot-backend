import { HttpModule, Module } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Module({
    imports:[
        HttpModule,
    ],
    providers:[MongoService],
    exports: [MongoService]
})

export class MongoModule{}