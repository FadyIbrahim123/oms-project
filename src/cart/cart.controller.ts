import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger'; 
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
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 404, description: 'Product or user not found', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to add to cart.', type: InternalServerErrorException })
  async addToCart(@Body() addToCartDto: AddToCartDto): Promise<Cart> {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'View cart by user ID' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the cart and its items' })
  @ApiResponse({ status: 404, description: 'Cart not found for the user ID', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to fetch cart.', type: InternalServerErrorException })
  async viewCart(@Param('userId') userId: number): Promise<Cart & { cartItems: CartItem[] }> {
    return this.cartService.viewCart(userId);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update cart item' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to update cart item.', type: InternalServerErrorException })
  async updateCart(@Body() updateCartDto: UpdateCartDto): Promise<CartItem> {
    return this.cartService.updateCartItem(updateCartDto);
  }

  @Delete('remove/:cartItemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'cartItemId', type: Number })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found', type: NotFoundException })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Failed to remove from cart.', type: InternalServerErrorException })
  async removeFromCart(@Param('cartItemId') cartItemId: number): Promise<void> {
    return this.cartService.removeFromCart(cartItemId);
  }
}
