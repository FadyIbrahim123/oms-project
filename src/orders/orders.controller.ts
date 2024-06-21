import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, ApplyCouponDto } from '../dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderById(Number(orderId));
  }

  @Put(':orderId/status')
  async updateOrderStatus(@Param('orderId') orderId: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(Number(orderId), updateOrderStatusDto);
  }

  @Post('apply-coupon')
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return this.ordersService.applyCoupon(applyCouponDto);
  }

}
