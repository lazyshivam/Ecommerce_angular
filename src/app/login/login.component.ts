import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserLogin } from './userLogin.interface';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
  

export class LoginComponent {
  
  userEmail: string = '';
  userPassword: string = '';
  isValid: boolean = false;
  isValidLength: boolean = false;
  private isAuthenticated: boolean = false;
  private authSecretKey: string = 'Bearer Token';
  

  constructor(private userService: UserService,private router:Router) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
     
   
  };
  
  onSubmit() {
    const user:UserLogin={
      email: this.userEmail,
      password: this.userPassword
    }

    if (this.userPassword.length < 8) {
      this.isValidLength = true;
      return;
    } 

    if (!this.isValidPassword()) {
      this.isValid = true;
      return;
    }

    this.isValidLength = false;
    this.isValid = false;

    this.userService.login(user).subscribe(
      (loggedInUser:any) => {
        // console.log('User created:', loggedInUser);
        this.isAuthenticated = true;
        
        const authToken = loggedInUser?.tokens?.access?.token;
        const userInfo = JSON.stringify(loggedInUser?.user);
        
        console.log('Auth token:', userInfo);
        localStorage.setItem(this.authSecretKey, authToken);
        localStorage.setItem('user-profile', userInfo);
        this.router.navigate(['/home'])

      },
      error => console.error('Error creating user:', error)
    );
     
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
  
  isValidPassword(): boolean {
    // Check if the password meets the criteria
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValidPassword = passwordRegex.test(this.userPassword.trim());
    return isValidPassword;
  }
}


