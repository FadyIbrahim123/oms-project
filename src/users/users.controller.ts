import { Controller, Param, Get} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}



    @Get('/:userId/orders')
    async getOrdersByUserId(@Param('userId') userId: number): Promise<any> {
      return this.usersService.getOrdersByUserId(userId);
    }


}
