import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isDropdownOpen: boolean = false;
  userInfo: any; // Update the type according to your requirement
  obj:any
  constructor(private router: Router) {
     this.obj = localStorage.getItem('user-profile');
    this.userInfo = JSON.parse(this.obj);

  }


  handleDropdownToggle(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log(this.userInfo,"hellow there");
  }

  handleLogout(): void {
    localStorage.removeItem('Bearer Token');
    this.router.navigate(['/login']);
  }

  handleCartClick(): void {
    this.router.navigate(['/user-cart'])
  }

  navigateToOrders(): void {
    this.router.navigate(['/userOrder']);
  }
}
