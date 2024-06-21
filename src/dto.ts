import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCartDto {
  @ApiProperty()
  @IsInt()
  cartItemId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsInt()
  userId: number;
}

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  status: string;
}

export class ApplyCouponDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  coupon: string;
}
