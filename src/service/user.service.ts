import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../app/signup/user.interface';
import { UserLogin } from '../app/login/userLogin.interface';
import { UserForgot } from '../app/forgot-password/forgot.interface';
import { ResetPassword } from '../app/reset-password/reset.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    signup(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:8080/v1/auth/register', user);
    }

    login(user: UserLogin): Observable<UserLogin> {
        return this.http.post<UserLogin>('http://localhost:8080/v1/auth/login', user);
    }
    forgotPassword(email: UserForgot): Observable<UserForgot> {
        return this.http.post<UserForgot>('http://localhost:8080/v1/auth/forgot-password', email);
    }
    resetUserPassword(password: ResetPassword, token: string): Observable<ResetPassword>{
        const urlWithToken = `http://localhost:8080/v1/auth/reset-password?token=${token}`;
        console.log(urlWithToken);
        return this.http.post<ResetPassword>(urlWithToken, password);
    }
    
}
