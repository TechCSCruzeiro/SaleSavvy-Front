import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { SalesConfirmation } from '../Models/SalesConfirmation';

@Injectable({
    providedIn: 'root',
})

export class TransactionalService{
    private apiUrlPost = 'https://localhost:7142/api/Sales'

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