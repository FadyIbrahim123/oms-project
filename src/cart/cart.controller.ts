// cart.controller.ts

import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from '../dto';
import { Cart, CartItem } from '@prisma/client';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() addToCartDto: AddToCartDto): Promise<Cart> {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get(':userId')
  async viewCart(@Param('userId') userId: number): Promise<Cart & { cartItems: CartItem[] }> {
    return this.cartService.viewCart(userId);
  }

  @Put('update')
  async updateCart(@Body() updateCartDto: UpdateCartDto): Promise<CartItem> {
    return this.cartService.updateCartItem(updateCartDto);
  }

  @Delete('remove/:cartItemId')
  async removeFromCart(@Param('cartItemId') cartItemId: number): Promise<void> {
    return this.cartService.removeFromCart(cartItemId);
  }
}
