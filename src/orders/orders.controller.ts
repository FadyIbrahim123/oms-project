import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, ApplyCouponDto } from '../dto';

@Controller('api/orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the order details' })
  async getOrderById(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderById(Number(orderId));
  }

  @Put(':orderId/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiBody({ type: UpdateOrderStatusDto })
  async updateOrderStatus(@Param('orderId') orderId: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(Number(orderId), updateOrderStatusDto);
  }

  @Post('apply-coupon')
  @ApiOperation({ summary: 'Apply coupon to an order' })
  @ApiBody({ type: ApplyCouponDto })
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return this.ordersService.applyCoupon(applyCouponDto);
  }
}
