import { Injectable } from '@angular/core'

import { Client } from '../Models/Client'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ClientService {
    constructor(private http: HttpClient) { }

    private apiUrlDelete = 'Deletar'
    private apiUrlPut = 'Link Modificar'
    private apiUrlGetById = ''

    getClientById(clientId: string): Observable<Client>{
        return this.http.get<Client>(`${this.apiUrlGetById}/${clientId}`);
    }

    updateUser(updateClient: Client): Observable<Client>{
         return this.http.put<Client>(`${this.apiUrlPut}/${updateClient.Id}`, updateClient);
     }

    deleteClient(clientId: string): Observable<any> {
        console.log("SERVICE CLIENTE METODO DELETE >> ", clientId)
        return this.http.delete<any>(`${this.apiUrlDelete}/${clientId}`);
    }

}