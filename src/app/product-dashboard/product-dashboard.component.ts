import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { HeaderComponent } from '../header/header.component';
import { ProductService } from '../../service/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {
  constructor(private productService: ProductService) {

    this.productService.getAllProduct().subscribe(
      data => {
        console.log("Products :", data);
        this.products = data;
      },
      error => {
        console.log("Error in getting all products",error);
      }
    )
  }
  
  products:any = [];
   
  
}
