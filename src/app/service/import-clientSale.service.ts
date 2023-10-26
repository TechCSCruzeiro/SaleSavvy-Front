import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ImportClientSaleService {
    private idClient = new Subject<string>();
    Guid$ = this.idClient.asObservable();

    sendGuidUser(Guid: string){
        this.idClient.next(Guid)
    }

}