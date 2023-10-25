import { Component } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ModalAddProductComponent } from '../modal-add-product/modal-add-product.component';
import { MatDialog} from '@angular/material/dialog';
interface Transaction {
  item: string;
  cost: number;
  quantidade: number;
  quantidadeSequence: {};
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  selected: number[] = []
  
  displayedColumns = ['description', 'quantity', 'price','valuetotal','actions' ];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4, quantidade: 25, quantidadeSequence: Array.from({ length: 25 }, (_, index) => index + 1) },
    {item: 'Frisbee', cost: 2,quantidade: 15, quantidadeSequence: Array.from({ length: 15 }, (_, index) => index + 1) },
    {item: 'Towel', cost: 5,quantidade: 55, quantidadeSequence: Array.from({ length: 55 }, (_, index) => index + 1) },
    {item: 'Sunscreen', cost: 4,quantidade: 95, quantidadeSequence: Array.from({ length: 95 }, (_, index) => index + 1) },
    {item: 'Cooler', cost: 25,quantidade: 15, quantidadeSequence: Array.from({ length: 15 }, (_, index) => index + 1) },
    {item: 'Swim suit', cost: 15,quantidade: 5, quantidadeSequence: Array.from({ length: 5 }, (_, index) => index + 1) },
  ];

  constructor (public dialog: MatDialog){
    this.transactions.forEach(transaction => {
      this.selected.push(1);
    });
  }
  
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  ModalAddProduct() {
    const dialogRef = this.dialog.open(ModalAddProductComponent, {
      width: 'auto', // Defina a largura do modal conforme necessário
    })
  }

}
