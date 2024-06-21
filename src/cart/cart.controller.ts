import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from '../dto';
import { Cart, CartItem } from '@prisma/client';

@Controller('api/cart')
@ApiTags('Cart') 
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiBody({ type: AddToCartDto })
  async addToCart(@Body() addToCartDto: AddToCartDto): Promise<Cart> {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'View cart by user ID' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the cart and its items' })
  async viewCart(@Param('userId') userId: number): Promise<Cart & { cartItems: CartItem[] }> {
    return this.cartService.viewCart(userId);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update cart item' })
  @ApiBody({ type: UpdateCartDto })
  async updateCart(@Body() updateCartDto: UpdateCartDto): Promise<CartItem> {
    return this.cartService.updateCartItem(updateCartDto);
  }

  @Delete('remove/:cartItemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'cartItemId', type: Number })
  async removeFromCart(@Param('cartItemId') cartItemId: number): Promise<void> {
    return this.cartService.removeFromCart(cartItemId);
  }
}
