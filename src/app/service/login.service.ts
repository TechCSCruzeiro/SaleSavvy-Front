import { Injectable } from '@angular/core'
import {Login} from '../Models/Login'
import {Observable} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class LoginService{
    private ApiUrlPost = "https://localhost:7142/register"

    constructor(private http: HttpClient){

    }
    getLogin(login: Login): Observable<Login>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Login>(this.ApiUrlPost,login,httpOptions)
    }

}