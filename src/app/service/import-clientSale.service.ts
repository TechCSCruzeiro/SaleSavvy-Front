import {Injectable} from '@angular/core';
import { Subject, BehaviorSubject  } from 'rxjs';
import { Client } from '../Models/Client';

@Injectable({
    providedIn: 'root'
})

export class ImportClientSaleService {
    private idClient = new Subject<string>();
    Guid$ = this.idClient.asObservable();

    private clientSource = new BehaviorSubject<Client | null>(null);
    currentClient = this.clientSource.asObservable();

    sendGuidUser(Guid: string){
        this.idClient.next(Guid)
    }

    changeClient(client: Client) {
        this.clientSource.next(client);
    }

}