import { Injectable } from '@angular/core'

import { Product } from '../Models/Product';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { ModificProduct } from '../Models/ModificProduct';

@Injectable({
    providedIn: 'root',
})

export class EstoqueService{

    private apiUrlGet = 'http://179.209.132.132:5000/api/Products/ListProduct?userId='
    private apiUrlPost = 'http://179.209.132.132:5000/api/Products/InsertProduct'
    private apiUrlGetById = 'http://179.209.132.132:5000/api/Products/Find/ProductById?productId='
    private apiUrlDelete = 'http://179.209.132.132:5000/api/Products/DesactiveProduct?productId='
    private apiUrlPut = 'http://179.209.132.132:5000/api/Products/ModificProduct'

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