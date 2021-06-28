import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('test/cors')
    async testCors(@Req() req:any){
        return this.authService.getProducts()
    }
}
