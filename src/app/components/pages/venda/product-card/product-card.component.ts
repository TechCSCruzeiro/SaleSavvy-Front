import { Component } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ModalAddProductComponent } from '../modal-add-product/modal-add-product.component';
import { MatDialog} from '@angular/material/dialog';
interface Transaction {
  item: string;
  cost: number;
  quantidade: number;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  selected = "padrao"
  
  displayedColumns = ['description', 'quantity', 'price','valuetotal','actions' ];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4, quantidade: 25},
    {item: 'Frisbee', cost: 2,quantidade: 15},
    {item: 'Towel', cost: 5,quantidade: 55},
    {item: 'Sunscreen', cost: 4,quantidade: 95},
    {item: 'Cooler', cost: 25,quantidade: 15},
    {item: 'Swim suit', cost: 15,quantidade: 5},
  ];

  constructor (public dialog: MatDialog){
    
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  generateNumberList(product: Transaction): number[] {
    return Array.from({ length: product.quantidade }, (_, index) => index + 1);
  }

  ModalAddProduct() {
    const dialogRef = this.dialog.open(ModalAddProductComponent, {
      width: 'auto', // Defina a largura do modal conforme necessário
    })
  }

}
