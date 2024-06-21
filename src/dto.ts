export class AddToCartDto {
    userId: number;
    productId: number;
    quantity: number;
  }

export class UpdateCartDto {
    cartItemId: number;
    quantity: number;
}
  

export class CreateOrderDto {
  userId: number;
}

export class UpdateOrderStatusDto {
  status: string;
}

export class ApplyCouponDto{
  userId: number;
  coupon: string;
}