import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) { }

    createUserCart(token: string): Observable<any> {
        // Create HTTP headers with the Authorization token
      
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        console.log(token,"Hello there")
        return this.http.post<any>('http://localhost:8080/v1/userCart/create',null, { headers });
    }

    addItemsToCart(token: string, id: string): Observable<any>{
        
        const body = {
             product_id:id,
         }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        })
        return this.http.post<any>('http://localhost:8080/v1/userCart/addItems', body, { headers });
    }

    updateCartItems(token: string, id: string,increment:number): Observable<any> {
        
        const body = {
            product: id,
            incrementBy:increment
        }
       console.log("authToken: ",token);
        const headers = new HttpHeaders({
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        })
        
        return this.http.post<any>('http://localhost:8080/v1/userCart/updateItems', body, { headers })
    }

    removeItem(token: string, id: string): Observable<any> {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        });

        return this.http.post<any>('http://localhost:8080/v1/userCart/removeItems',{productId:id},{headers})
    }
    


    getAllUserCartProduct(token: string): Observable<any[]> {
        // Create HTTP headers with the Authorization token
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>('http://localhost:8080/v1/userCart/getUserCart', { headers });
    }
    
}
