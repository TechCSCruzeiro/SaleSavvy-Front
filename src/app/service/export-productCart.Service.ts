import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ExportProductCartService {
    private idProduct = new Subject<string>();
    mensagem$ = this.idProduct.asObservable();

    enviarMensagem(mensagem: string){
        this.idProduct.next(mensagem)
    }

}