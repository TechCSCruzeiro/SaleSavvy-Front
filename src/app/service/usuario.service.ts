import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { environment } from '../environments/environmet';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrlPost = environment.apiUrl.concat('/User/register')
    private apiUrlGet = environment.apiUrl.concat('/User/listUser')
    private apiUrlGetById = environment.apiUrl.concat('/User/findUserById')
    private apiUrlPut = environment.apiUrl.concat('/User/updateUser')
    private apiUrlDelete = environment.apiUrl.concat('/User/deleteUser')
    private apiUrlModifyPermission = environment.apiUrl.concat('/User/Alter/Type?userId=')

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