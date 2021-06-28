import { Injectable, HttpService } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AuthService {
    private readonly DATA_URL = 'http://192.168.101.20:4000/test';

    async getProducts(){
        console.log("here");
        const products = await axios.get(this.DATA_URL);
        console.log(typeof products.data);
        return products.data
    }

}
