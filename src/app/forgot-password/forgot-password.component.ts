import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserForgot } from './forgot.interface';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  userEmail: string = "";
  constructor(private userService: UserService) { };
  onSubmit() {
   
    const email: UserForgot = {
      email:this.userEmail,
    }
    this.userService.forgotPassword(email).subscribe(
      result => {
        console.log('Link is sent to your email address ' + result);
        alert("Link is send to your email address " + this.userEmail);
      },
      error=>console.log(error)
      
    )
  }
}
