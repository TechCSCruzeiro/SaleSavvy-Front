import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrlPost = 'https://localhost:7142/register'//'https://localhost:44351/usuario/incluir'
    private apiUrlGet = "https://localhost:7142/api/User/listUser" //'https://localhost:44351/usuario/listar'
    private apiUrlGetById = 'https://localhost:44351/usuario/localizar'
    private apiUrlPut = 'https://localhost:44351/usuario/alterar'
    private apiUrlDelete = 'https://localhost:44351/usuario/excluir'

    constructor(private http: HttpClient) {

    }
    getUsers(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.apiUrlGet);
    }

    getUserById(userId: string): Observable<Usuario>{
        return this.http.get<Usuario>(`${this.apiUrlGetById}/${userId}`);
    }

    createUser(novoUsuario: Usuario): Observable<Usuario> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Usuario>(this.apiUrlPost, novoUsuario, httpOptions)
    }

    updateUser(updateUser: Usuario): Observable<Usuario>{
        return this.http.put<Usuario>(`${this.apiUrlPut}/${updateUser.Id}`, updateUser);
    }

    deleteUser(userId: string): Observable<any>{
        return this.http.delete<any>(`${this.apiUrlDelete}/${userId}`);
    }

}