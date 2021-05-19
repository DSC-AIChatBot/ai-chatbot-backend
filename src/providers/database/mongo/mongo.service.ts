import {Model, FilterQuery, UpdateQuery} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { Document } from 'mongoose';

@Injectable()
export class MongoService{
    constructor(
        private readonly http:HttpService,
    ){}

    async findOne<T extends Document>(DBFilterQuery:FilterQuery<T>,MongoSchema:Model<T>):Promise<T>{
        return MongoSchema.findOne(DBFilterQuery);
    }
    
    async find<T extends Document>(DBFilterQuery:FilterQuery<T>,MongoSchema:Model<T>):Promise<T[]>{
        return MongoSchema.find(DBFilterQuery);
    }
    
    async create<T extends Document>(inputdata:T,MongoSchema:Model<T>):Promise<T> {
        const newDB = new MongoSchema(inputdata);
        return newDB.save()
    }
    
    async findOneAndUpdate<T extends Document>(DBFilterQuery: FilterQuery<T>, MongoSchema:Model<T>, DB: UpdateQuery<T>): Promise<T>{
        return MongoSchema.findOneAndUpdate(DBFilterQuery, DB);
    }

    async findAll<T extends Document>(MongoSchema:Model<T>): Promise<T[]> {
        return MongoSchema.find().exec();
    }


}