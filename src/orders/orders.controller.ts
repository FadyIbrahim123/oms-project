import { Controller, Post, Body, NotFoundException, BadRequestException, InternalServerErrorException, Get, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, ApplyCouponDto } from '../dto';

@Controller('api/orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request. The cart is empty for the given user ID.', type: BadRequestException })
  @ApiResponse({ status: 404, description: 'Not Found. No user with the given ID.', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to create order.', type: InternalServerErrorException })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the order details' })
  @ApiResponse({ status: 404, description: 'Not Found. No order with the given ID.', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to fetch order.', type: InternalServerErrorException })
  async getOrderById(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderById(Number(orderId));
  }

  @Put(':orderId/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiResponse({ status: 200, description: 'The order status has been successfully updated.'})
  @ApiResponse({ status: 404, description: 'Not Found. No order with the given ID.', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to update order status.', type: InternalServerErrorException })
  async updateOrderStatus(@Param('orderId') orderId: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(Number(orderId), updateOrderStatusDto);
  }

  @Post('apply-coupon')
  @ApiOperation({ summary: 'Apply coupon to an order' })
  @ApiBody({ type: ApplyCouponDto })
  @ApiResponse({ status: 200, description: 'The coupon has been successfully applied.'})
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid coupon code.', type: BadRequestException })
  @ApiResponse({ status: 404, description: 'Not Found. No user with the given ID.', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to apply coupon code.', type: InternalServerErrorException })
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return this.ordersService.applyCoupon(applyCouponDto);
  }
}
