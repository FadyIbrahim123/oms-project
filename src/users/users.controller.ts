import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { UsersService } from './users.service';

@Controller('api/users')
@ApiTags('Users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId/orders')
  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Returns orders for the user' })
  async getOrdersByUserId(@Param('userId') userId: number): Promise<any> {
    return this.usersService.getOrdersByUserId(userId);
  }
}
