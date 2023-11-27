import { Injectable } from '@angular/core'

import { Usuario } from '../Models/Usuario'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs';
import { Record } from '../Models/Record';
import { Product } from '../Models/Product';
import { environment } from '../environments/environmet';

@Injectable({
    providedIn: 'root',
})

export class RecordService{
    private apiUrlPostMovimentStock = environment.apiUrl.concat('/MovementRecords/record/movement/stock')
    private apiUrlPostStock = environment.apiUrl.concat('/MovementRecords/record/stock')
    private apiUrlPostSales = environment.apiUrl.concat('/MovementRecords/record/salles')
    
    private apiUrlGetDownload = environment.apiUrl.concat('/MovementRecords/api/excel/download?fileId=')
    

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