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
    private apiUrlPostMovimentStock = 'http://179.209.132.132:5000/api/MovementRecords/record/movement/stock'
    private apiUrlPostStock = 'http://179.209.132.132:5000/api/MovementRecords/record/stock'
    private apiUrlPostSales = 'http://179.209.132.132:5000/api/MovementRecords/record/salles'
    
    private apiUrlGetDownload = 'http://179.209.132.132:5000/api/MovementRecords/api/excel/download?fileId='
    

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

    getSales(params: Record): Observable<any>
    {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(this.apiUrlPostSales, params, httpOptions)
    }

    getdownloadRecord(idRecord: string): Observable<Blob>{
        return this.http.get(`${this.apiUrlGetDownload}${idRecord}`, {responseType: 'blob'})
    }
    

}