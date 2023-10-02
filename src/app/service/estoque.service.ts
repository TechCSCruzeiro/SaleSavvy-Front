import { Injectable } from '@angular/core'

import { Product } from '../Models/Product';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class EstoqueService{

    private apiUrlGet = 'https://localhost:7142/api/Teste/product/list'
    private apiUrlPost = 'https://localhost:7142/api/Products/InsertProduct'
    private apiUrlGetById = 'https://localhost:7142/api/Teste/product'

    constructor(private http: HttpClient) 
    {
    }

    getProduts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.apiUrlGet);
    }

    getUserById(productId: string): Observable<Product>{
        return this.http.get<Product>(`${this.apiUrlGetById}/${productId}`);
    }

    createProduct(newProduct: Product): Observable<Product> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Product>(this.apiUrlPost, newProduct, httpOptions)
    }

}