import { Injectable } from '@angular/core'

import { Client } from '../Models/Client'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ClientService {
    constructor(private http: HttpClient) { }

    private apiUrlPostList = 'https://localhost:7142/api/Client/Search/ListClient?userId='
    private apiUrlDelete = 'Deletar'
    private apiUrlPut = 'Link Modificar'
    private apiUrlGetById = 'https://localhost:7142/api/Client/test'

    postListClient(userId: string): Observable<Client[]>{
        return this.http.get<Client[]>(`${this.apiUrlPostList}${userId}`);
    }

    // postListClient(userId: string): Observable<Client[]>{
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     };
    //     return this.http.post<Client[]>(this.apiUrlPostList, {userId: userId}, httpOptions)
    // }

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