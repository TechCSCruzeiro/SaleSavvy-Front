import { Injectable } from '@angular/core'

import { Client } from '../Models/Client'

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ClientService {
    constructor(private http: HttpClient) { }

    
    private apiUrlPostList = environment.apiUrl.concat('/Client/Search/ListClient?userId=')
    private apiUrlDelete = 'Deletar'
    private apiUrlPut = 'Link Modificar'
    private apiUrlPostById = environment.apiUrl.concat('/Client/Search/Client?userId=')

    postListClient(userId: string): Observable<Client[]>{
        return this.http.get<Client[]>(`${this.apiUrlPostList}${userId}`);
    }

    postClientById(clientId: string): Observable<Client>{
         const httpOptions = {
             headers: new HttpHeaders({
                 'Content-Type': 'application/json'
             })
         };
         return this.http.post<Client>(`${this.apiUrlPostById}${clientId}`, httpOptions)
     }

    updateUser(updateClient: Client): Observable<Client>{
         return this.http.put<Client>(`${this.apiUrlPut}/${updateClient.Id}`, updateClient);
     }

    deleteClient(clientId: string): Observable<any> {
        console.log("SERVICE CLIENTE METODO DELETE >> ", clientId)
        return this.http.delete<any>(`${this.apiUrlDelete}/${clientId}`);
    }

}