import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { Record } from '../Models/Record';
import { Product } from '../Models/Product';

@Injectable({
    providedIn: 'root',
})

export class RecordService{
    private apiUrlPostMovimentStock = 'https://localhost:7142/api/MovementRecords/record/movement/stock'
    private apiUrlPostStock = 'https://localhost:7142/api/MovementRecords/record/stock'
    
    private apiUrlGetDownload = 'https://localhost:7142/api/MovementRecords/api/excel/download?fileId='
    

    constructor (private http: HttpClient){}

    getIdMovimentStock(params: Record): Observable<any>
    {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(this.apiUrlPostMovimentStock, params, httpOptions)
    }

    getIdStock(params: Record): Observable<any>
    {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(this.apiUrlPostStock, params, httpOptions)
    }

    getdownloadRecord(idRecord: string): Observable<Blob>{
        return this.http.get(`${this.apiUrlGetDownload}${idRecord}`, {responseType: 'blob'})
    }
    

}