import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Cart, CartItem } from '@prisma/client';
import { AddToCartDto, UpdateCartDto } from '../dto';

const prisma = new PrismaClient();

@Injectable()
export class CartService {
  constructor() {}

  async addToCart(data: AddToCartDto): Promise<Cart> {
    try {
      // Fetch product details including price
      const product = await prisma.product.findUnique({
        where: { productId: data.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${data.productId} not found`);
      }

      // Check if the user exists
      const userExists = await prisma.user.findUnique({
        where: { userId: data.userId },
      });

      if (!userExists) {
        throw new NotFoundException(`User with ID ${data.userId} not found`);
      }

      let cart = await prisma.cart.findFirst({
        where: { userId: data.userId },
        include: { cartItems: true },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId: data.userId },
          include: { cartItems: true },
        });
      }

      let cartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.cartId,
          productId: data.productId,
        },
      });

      if (!cartItem) {
        cartItem = await prisma.cartItem.create({
          data: {
            cartId: cart.cartId,
            productId: data.productId,
            quantity: data.quantity,
            price: product.price, // Use product price retrieved above
            totalPrice: data.quantity * product.price,
          },
        });
      } else {
        cartItem = await prisma.cartItem.update({
          where: { cartItemId: cartItem.cartItemId },
          data: {
            quantity: cartItem.quantity + data.quantity,
            totalPrice: (cartItem.quantity + data.quantity) * product.price, // Update totalPrice based on product price
          },
        });
      }

      const cartItems = await prisma.cartItem.findMany({
        where: { cartId: cart.cartId },
      });

      const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const totalPrice = subtotal * (cart.promoCodeMultiplier);

      cart = await prisma.cart.update({
        where: { cartId: cart.cartId },
        data: {
          subtotal,
          totalPrice,
        },
        include: { cartItems: true },
      });

      return cart;
    } catch (error) {
      throw new Error(`Failed to add to cart: ${error.message}`);
    }
  }

  async viewCart(userId: number): Promise<Cart & { cartItems: CartItem[] }> {
    try {
      const userIdAsNumber = Number(userId);

      if (isNaN(userIdAsNumber)) {
        throw new Error(`Invalid userId: ${userId}`);
      }

      const cart = await prisma.cart.findFirst({
        where: { userId: userIdAsNumber },
        include: { cartItems: true },
      });

      if (!cart) {
        throw new NotFoundException(`Cart not found for user with ID ${userId}`);
      }

      return cart;
    } catch (error) {
      throw new Error(`Failed to fetch cart: ${error.message}`);
    }
  }

  async updateCartItem(data: UpdateCartDto): Promise<CartItem> {
    try {
      const currentCartItem = await prisma.cartItem.findUnique({
        where: { cartItemId: data.cartItemId },
      });
  
      if (!currentCartItem) {
        throw new NotFoundException(`CartItem with ID ${data.cartItemId} not found`);
      }
  
      const updatedCartItem = await prisma.cartItem.update({
        where: { cartItemId: data.cartItemId },
        data: {
          quantity: data.quantity,
          totalPrice: data.quantity * currentCartItem.price,
        },
      });
  
      // Fetch the parent cart to recalculate prices
      const cart = await prisma.cart.findFirst({
        where: { cartId: currentCartItem.cartId },
        include: { cartItems: true },
      });
  
      if (!cart) {
        throw new Error(`Cart with ID ${currentCartItem.cartId} not found`);
      }
  
      // Calculate subtotal
      const subtotal = cart.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const totalPrice = subtotal * cart.promoCodeMultiplier;
  
      // Update cart with new subtotal and totalPrice
      await prisma.cart.update({
        where: { cartId: cart.cartId },
        data: {
          subtotal,
          totalPrice,
        },
      });
  
      return updatedCartItem;
    } catch (error) {
      throw new Error(`Failed to update cart item: ${error.message}`);
    }
  }
  

  async removeFromCart(cartItemId: number): Promise<void> {
    try {
      const cartItemIdAsNumber = Number(cartItemId);
  
      const deletedCartItem = await prisma.cartItem.delete({
        where: { cartItemId: cartItemIdAsNumber },
      });
  
      if (!deletedCartItem) {
        throw new Error(`CartItem with ID ${cartItemId} not found`);
      }
  
      const cart = await prisma.cart.findFirst({
        where: { cartId: deletedCartItem.cartId },
        include: { cartItems: true },
      });
  
      if (!cart) {
        throw new Error(`Cart with ID ${deletedCartItem.cartId} not found`);
      }
  
      // Calculate subtotal
      const subtotal = cart.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const totalPrice = subtotal * cart.promoCodeMultiplier;
  
      // Update cart with new subtotal and totalPrice
      await prisma.cart.update({
        where: { cartId: cart.cartId },
        data: {
          subtotal,
          totalPrice,
        },
      });
    } catch (error) {
      throw new Error(`Failed to remove from cart: ${error.message}`);
    }
  }
  
}
