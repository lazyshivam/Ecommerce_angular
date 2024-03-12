import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input,OnInit,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: any; 
  @Output() onQuantityChangeEvent:EventEmitter<any>=new EventEmitter<any>();
  @Output() removeItemEvent: EventEmitter<any> = new EventEmitter<any>(); // EventEmitter to emit remove event
  quantity: any;
  token: any;

  constructor(private cartService:CartService) { }
  
  ngOnInit(): void{
    this.quantity = this.item.quantity
    this.token = localStorage.getItem('Bearer Token');
    console.log(this.item)
  }

  handleQuantityChange(event: any): void {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
      const incrementedBy = newQuantity - this.item.quantity;
      this.onQuantityChangeEvent.emit({ product: this.item.product, incrementedBy: incrementedBy });
      
      console.log(`Quantity: ${newQuantity}`);
    }
  }

  handleRemoveItem(): void {
    this.removeItemEvent.emit(this.item.product);
  }

  

  // onQuantityChange(product: any, quantityChange: number): void {
  //   const authToken = this.token;
  //   this.cartService.updateCartItems(authToken,product, quantityChange).subscribe(
  //     data => console.log("Cart items updated successfully",data),
  //     error=>console.log("Error in updating cart items",error),
  //   );
  // }
}
