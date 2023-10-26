import { Injectable } from '@angular/core'

import { Client } from '../Models/Client'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ClientService {
    constructor(private http: HttpClient) 
    {}

    

}