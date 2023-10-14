import { Component } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  quantidade: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', quantidade: 2 },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', quantidade: 55 },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', quantidade: 45 },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', quantidade: 35 },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', quantidade: 25 },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', quantidade: 5 },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', quantidade: 5 },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', quantidade: 50 },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', quantidade: 9 },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', quantidade: 15 },
];

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {

  displayedColumns: string[] = ['name', 'quantity' , 'value', 'valueTotal', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  availableQuantities: number[] = [];

  generateNumberList(product: PeriodicElement): number[] {
    return Array.from({ length: product.quantidade }, (_, index) => index + 1);
  }
}
