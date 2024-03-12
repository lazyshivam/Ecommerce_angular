import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }
   
    

    placeUserOrder(token: string,userAddressDetails:any) {
        const headers = new HttpHeaders({
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        });

        const body = userAddressDetails;

        return this.http.post<any>('http://localhost:8080/v1/order/make_order', body, { headers });

        
    }
   
    
}
