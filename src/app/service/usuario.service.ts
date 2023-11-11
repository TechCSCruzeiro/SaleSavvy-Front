import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrlPost = 'https://localhost:7142/api/User/register'
    private apiUrlGet = "https://localhost:7142/api/User/listUser"
    private apiUrlGetById = 'https://localhost:7142/api/User/findUserById'
    private apiUrlPut = 'https://localhost:7142/api/User/updateUser'
    private apiUrlDelete = 'https://localhost:7142/api/User/deleteUser'
    private apiUrlModifyPermission = 'https://localhost:7142/api/User/Alter/Type?userId='

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
        return this.http.put<Usuario>(`${this.apiUrlPut}`, updateUser);
    }

    deleteUser(userId: string): Observable<any>{
        return this.http.delete<any>(`${this.apiUrlDelete}/${userId}`);
    }

    updatePermission(userId: string,isAdm: boolean): Observable<any>{
        const permiss = ''
        return this.http.put<any>(`${this.apiUrlModifyPermission}${userId}&isAdm=${isAdm}`, permiss);
    }

}