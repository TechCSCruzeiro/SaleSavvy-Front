import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Observable} from 'rxjs';
import { Address } from '../Models/Address';

@Injectable({
    providedIn: 'root'
})

export class VendaService {
    private apiSearchAddress = 'https://viacep.com.br/ws'

    constructor(private http: HttpClient){}

    getAddress(Cep: string): Observable<Address>{
        return this.http.get<Address>(`${this.apiSearchAddress}/${Cep}/json/`)
    }

}