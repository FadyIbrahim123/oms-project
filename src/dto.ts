export class AddToCartDto {
    userId: number;
    productId: number;
    quantity: number;
  }

export class UpdateCartDto {
    cartItemId: number;
    quantity: number;
}
  