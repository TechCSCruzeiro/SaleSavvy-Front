import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class TransactionalService{
    private apiUrlPost = ''

    constructor(private http: HttpClient) 
    {
    }
}