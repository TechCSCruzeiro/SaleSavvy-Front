import { Injectable } from '@angular/core'

import { Product } from '../Models/Product';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { ModificProduct } from '../Models/ModificProduct';

@Injectable({
    providedIn: 'root',
})

export class EstoqueService{

    private apiUrlGet = 'https://localhost:7142/api/Products/ListProduct?userId='
    private apiUrlPost = 'https://localhost:7142/api/Products/InsertProduct'
    private apiUrlGetById = 'https://localhost:7142/api/Products/Find/ProductById?productId='
    private apiUrlDelete = 'https://localhost:7142/api/Products/DesactiveProduct?productId='
    private apiUrlPut = 'https://localhost:7142/api/Products/ModificProduct'

    constructor(private http: HttpClient) 
    {
    }

    getProduts(userId: string): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiUrlGet}${userId}`);
    }

    getUserById(productId: string): Observable<Product>{
        return this.http.get<Product>(`${this.apiUrlGetById}${productId}`);
    }

    createProduct(newProduct: Product): Observable<Product> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Product>(this.apiUrlPost, newProduct, httpOptions)
    }

    updateUser(updateProduct: ModificProduct,): Observable<ModificProduct>{
        return this.http.put<ModificProduct>(`${this.apiUrlPut}`, updateProduct);
    }

    deleteProduct(productId: string): Observable<any>{
        return this.http.delete<any>(`${this.apiUrlDelete}${productId}`);
    }

}