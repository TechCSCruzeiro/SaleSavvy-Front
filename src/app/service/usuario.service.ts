import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrl = 'https://localhost:44351/usuario/incluir'
    
    constructor(private http: HttpClient) {

    }
    getAll(): Observable<any>{
        return this.http.get(this.apiUrl);
    }

    createUser(novoUsuario: Usuario): Observable<Usuario> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Usuario>(this.apiUrl, novoUsuario, httpOptions)
    }

}