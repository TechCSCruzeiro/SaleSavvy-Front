import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrlPost = 'https://localhost:44351/usuario/incluir'
    private apiUrlGet = 'https://localhost:44351/usuario/listar'

    constructor(private http: HttpClient) {

    }

    

    getUsers(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.apiUrlGet);
    }

    createUser(novoUsuario: Usuario): Observable<Usuario> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Usuario>(this.apiUrlPost, novoUsuario, httpOptions)
    }

}