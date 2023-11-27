import { Injectable } from '@angular/core'

import { Product } from '../Models/Product';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { ModificProduct } from '../Models/ModificProduct';
import { environment } from '../environments/environmet';

@Injectable({
    providedIn: 'root',
})

export class EstoqueService{

    private apiUrlGet = environment.apiUrl.concat('/Products/ListProduct?userId=')
    private apiUrlPost = environment.apiUrl.concat('/Products/InsertProduct')
    private apiUrlGetById = environment.apiUrl.concat('/Products/Find/ProductById?productId=')
    private apiUrlDelete = environment.apiUrl.concat('/Products/DesactiveProduct?productId=')
    private apiUrlPut = environment.apiUrl.concat('/Products/ModificProduct')

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