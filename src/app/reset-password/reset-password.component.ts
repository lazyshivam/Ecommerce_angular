import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResetPassword } from './reset.interface';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  isValid: boolean = false;
  isValidLength: boolean = false;
  token: string = ''
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { };
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    console.log("token",this.token);
  }
  onSubmit() {
    const password: ResetPassword = {
      password: this.newPassword.trim(),
    }

    if (this.newPassword.length < 8) {
      this.isValidLength = true;
      return;
    } 
    if (!this.isValidPassword()) {
      this.isValid = true;
      return;
    }
    
    if (this.newPassword.trim() !== this.confirmPassword.trim()) {
      this.passwordMismatch = true;
      return;
    }
    const verificationToken = this.token;
    this.isValidLength = false;
    this.passwordMismatch = false;
    this.isValid = false;
    this.userService.resetUserPassword(password,verificationToken).subscribe(
      data => {
        console.log('User password updated successfully', data);
        alert("Password updated successfully");
        this.router.navigate(['/login']);
      },
      error=>console.log('Error updating user password',error)
    )

   
  }

  isValidPassword(): boolean {
    // Check if the password meets the criteria
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValidPassword = passwordRegex.test(this.newPassword.trim());
    return isValidPassword;
  }
}
