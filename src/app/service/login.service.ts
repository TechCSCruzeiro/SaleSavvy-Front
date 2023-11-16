import { Injectable } from '@angular/core'
import {Login} from '../Models/Login'
import {Observable} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class LoginService{
    private ApiUrlPost = "http://179.209.132.132:5000/api/Autentication/login"//"http://179.209.132.132:5000/api/Teste"

    constructor(private http: HttpClient){

    }
    postLogin(login: Login): Observable<Login>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Login>(this.ApiUrlPost,login,httpOptions)
    }

}