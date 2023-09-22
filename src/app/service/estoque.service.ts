import { Injectable } from '@angular/core'

import { Product } from '../Models/Product';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class EstoqueService{

    private apiUrlGet = 'https://localhost:7142/api/Teste'

    constructor(private http: HttpClient) 
    {
    }

    getProduts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.apiUrlGet);
    }

}