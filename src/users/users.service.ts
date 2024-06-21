import { Injectable, NotFoundException } from '@nestjs/common';
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

      if (!orders){
        throw new Error(`No user/cart for this userId: ${userId}`);
      }

       return orders;

    } catch (error) {
      throw new Error(`Failed to fetch orders for user ${userId}: ${error.message}`);
    }
  }
}
