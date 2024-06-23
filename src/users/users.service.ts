import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient, Order } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getOrdersByUserId(userId: number): Promise<any> {
    try {
      const userIdAsInt = Number(userId);

      const orders = await prisma.order.findMany({
        where: { userId: userIdAsInt },
        orderBy: { orderDate: 'desc' },
      });

      if (orders.length === 0) {
        throw new NotFoundException(`No orders found for user with ID ${userId}`);
      }

      return orders;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch orders for user ${userId}: ${error.message}`);
    }
  }
}
