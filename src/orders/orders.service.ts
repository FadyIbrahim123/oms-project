import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Order } from '@prisma/client';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dto';

const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  async createOrder(data: CreateOrderDto): Promise<Order> {
    try {
      const cart = await prisma.cart.findFirst({
        where: { userId: data.userId },
        include: { cartItems: true },
      });

      if (!cart || cart.cartItems.length === 0) {
        throw new Error(`Cart is empty for user with ID ${data.userId}`);
      }

      const order = await prisma.order.create({
        data: {
          userId: data.userId,
          status: 'Pending',
        },
      });

      await prisma.cartItem.deleteMany({
        where: { cartId: cart.cartId },
      });

      await prisma.cart.update({
        where: { cartId: cart.cartId },
        data: { subtotal: 0, totalPrice: 0, promoCodeMultiplier: 1 },
      });

      return order;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async getOrderById(orderId: number): Promise<Order> {
    try {
      const order = await prisma.order.findUnique({
        where: { orderId },
        include: { user: true },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      return order;
    } catch (error) {
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
  }

  async updateOrderStatus(orderId: number, data: UpdateOrderStatusDto): Promise<Order> {
    try {
      const order = await prisma.order.findUnique({
        where: { orderId },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      const updatedOrder = await prisma.order.update({
        where: { orderId },
        data: { status: data.status },
      });

      return updatedOrder;
    } catch (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }
}
