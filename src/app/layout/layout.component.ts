import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductDashboardComponent } from '../product-dashboard/product-dashboard.component';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent,ProductDashboardComponent,UserCartComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  token: any='';
  constructor(private cartService: CartService) {
    this.token=localStorage.getItem('Bearer Token');
    const authToken = this.token;
    if (authToken && authToken.length > 0) {
      this.cartService.createUserCart(authToken).subscribe(
        cart => console.log('cart created successfully'),
        error => console.log('Error creating user cart: ' ,error)
      );
   }
   
  }
}
