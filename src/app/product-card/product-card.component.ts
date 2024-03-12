import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() productData: any;
  user: any;
  obj: any;
  token:any;
  BASE_URL: string="http://localhost:8080"

  constructor(private http: HttpClient,private cartService:CartService) {
    this.obj=localStorage.getItem('user-profile')
    this.user = JSON.parse(this.obj);
    this.token = localStorage.getItem('Bearer Token');
  }

  handleAddToCart() {
    const authToken = this.token;
   this.cartService.addItemsToCart(authToken,this.productData.id).subscribe(
      (data) => {
        console.log('Product added to cart:', data);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
