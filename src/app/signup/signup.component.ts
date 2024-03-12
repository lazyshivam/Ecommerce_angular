import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.interface'
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
// import { ConfigService } from '../../config/config.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent {
  userName = '';
  userEmail = '';
  userPassword = '';
  isValid: boolean = false;
  isValidLength: boolean = false;
  private isAuthenticated: boolean = false;
  private authSecretKey: string = '';


  constructor(private userService: UserService, private router: Router) { 
    
  }
  
  onSubmit() {
    const user:User={
      name: this.userName,
      email: this.userEmail,
      password: this.userPassword
    };
    console.log(user);
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

    this.userService.signup(user).subscribe(
      createdUser => {
        console.log('User created:', createdUser);
        this.router.navigate(['/login']);

      },
      error => console.error('Error creating user:', error)
    );
  }

  isValidPassword(): boolean {
    // Check if the password meets the criteria
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValidPassword = passwordRegex.test(this.userPassword.trim());
    return isValidPassword;
  }

}
