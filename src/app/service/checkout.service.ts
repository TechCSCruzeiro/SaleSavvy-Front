import {Injectable} from '@angular/core';
import { Subject, BehaviorSubject  } from 'rxjs';
import { Product } from '../Models/Product';

@Injectable({
    providedIn: 'root'
})

export class CheckoutService {
    private productsSource = new BehaviorSubject<Product[] | null>(null);
    currentProducts = this.productsSource.asObservable();

    changeProduct(products: Product[]) {
        this.productsSource.next(products);
    }

    
}