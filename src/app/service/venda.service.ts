import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Observable} from 'rxjs';
import { Address } from '../Models/Address';
import { Client } from '../Models/Client';

@Injectable({
    providedIn: 'root'
})

export class VendaService {
    private apiSearchAddress = 'https://viacep.com.br/ws'
    private apiUrlPost = 'https://localhost:7142/api/Client/Register/Customer'

    constructor(private http: HttpClient){}

    getAddress(Cep: string): Observable<Address>{
        return this.http.get<Address>(`${this.apiSearchAddress}/${Cep}/json/`)
    }
    
    createClient(newClient: Client): Observable<Client> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Client>(this.apiUrlPost, newClient, httpOptions)
    }

}