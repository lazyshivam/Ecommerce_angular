import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ProductService } from '../../service/product.service';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule,CartItemComponent],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent {
  userCartData: any;
  token: any
  totalPrice: number = 0;
  
  userAddressDetails={
        "shippingAddress":{
              "line":"510 Townsend St",
              "postal_code": "98140",
              "city":"San Francisco",
              "state": "CA",
              "country": "US"
            },
        "description":"This is test description"
    }

  constructor(private cartService: CartService,private router:Router,private orderService:OrderService) {
   
    this.token=localStorage.getItem('Bearer Token');
    const authToken = this.token;
   
    
    this.cartService.getAllUserCartProduct(authToken).subscribe(data => {
      console.log("User cart data: ", data);
      this.userCartData = data;
      this.calculateTotalPrice();
    }
      ,
      error => {
        console.log("User cart error: ", error);
      }
    )
  }

  removeItemFromCart(product: any): void {
    
    this.cartService.removeItem(this.token, product).subscribe(
      data => {
        console.log("Product removed successfully", data);
        this.userCartData = data.result.items;
        this.calculateTotalPrice();
      },
      error => console.log("Error removing item", error)
    );
  }

  updateOnQuantityChange(event:any):void {
    console.log("Product updated successfully", event);
    const { product, incrementedBy } = event;
    this.cartService.updateCartItems(this.token,product, incrementedBy).subscribe(
      data => {
        console.log("Product updated successfully", data);
        this.calculateTotalPrice();
        this.userCartData = data.items;
      },
      error=>console.log("Error updating product", error)
    )
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;
    if (this.userCartData) {
      this.userCartData.forEach((item: any) => {
        this.totalPrice += item.price * item.quantity;
      });
    }
  }

  makeOrder(): void{
    this.orderService.placeUserOrder(this.token, this.userAddressDetails).subscribe(
      data => {
        console.log("Order is created successfully", data);
      },
      error=>console.log("Order is not created ",error)
     )
  }
  goToProductPage() {
    this.router.navigate(['/home']);
  }
}
