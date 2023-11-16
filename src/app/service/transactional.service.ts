import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { SalesConfirmation } from '../Models/SalesConfirmation';

@Injectable({
    providedIn: 'root',
})

export class TransactionalService{
    private apiUrlPost = 'http://179.209.132.132:5000/api/Sales'

    constructor(private http: HttpClient) 
    {
    }
    transaction(sales: SalesConfirmation): Observable<SalesConfirmation>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<SalesConfirmation>(this.apiUrlPost, sales, httpOptions)
    }

}