import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getAllProduct(): Observable<any[]> { // Use `any` to represent the structure of the data
        return this.http.get<any[]>('http://localhost:8080/v1/products/getAllProduct');
    }
    
}
