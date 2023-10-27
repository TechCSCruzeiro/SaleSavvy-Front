import {Injectable} from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from '../Models/Product';

@Injectable({
    providedIn: 'root'
})

export class ExportProductCartService {
    private idProduct = new Subject<string>();
    idProduct$ = this.idProduct.asObservable();

    private productSource = new BehaviorSubject<Product[] | null>(null);
    currentProduct = this.productSource.asObservable();

    sendGuidProduct(mensagem: string){
        this.idProduct.next(mensagem)
    }

    changeProduct(product: Product[]) {
        this.productSource.next(product);
      }

}