import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { OrdersService } from './orders/orders.service';

@Module({
  imports: [CartModule, OrdersModule],
  controllers: [AppController, OrdersController, CartController],
  providers: [AppService, OrdersService, CartService],
})
export class AppModule {}
