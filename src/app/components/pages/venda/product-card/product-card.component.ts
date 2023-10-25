import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ModalAddProductComponent } from '../modal-add-product/modal-add-product.component';
import { MatDialog} from '@angular/material/dialog';
import { ExportProductCartService } from 'src/app/service/export-productCart.Service';
import { EstoqueService } from 'src/app/service/estoque.service';
import { Product } from 'src/app/Models/Product';
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
  idProduct!: string
  productAdded!:Product
  productTest: any

  displayedColumns = ['description', 'quantity', 'price','valuetotal','actions' ];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4, quantidade: 25, quantidadeSequence: Array.from({ length: 25 }, (_, index) => index + 1) },
    {item: 'Frisbee', cost: 2,quantidade: 15, quantidadeSequence: Array.from({ length: 15 }, (_, index) => index + 1) },
    {item: 'Towel', cost: 5,quantidade: 55, quantidadeSequence: Array.from({ length: 55 }, (_, index) => index + 1) },
    {item: 'Sunscreen', cost: 4,quantidade: 95, quantidadeSequence: Array.from({ length: 95 }, (_, index) => index + 1) },
    {item: 'Cooler', cost: 25,quantidade: 15, quantidadeSequence: Array.from({ length: 15 }, (_, index) => index + 1) },
    {item: 'Swim suit', cost: 15,quantidade: 5, quantidadeSequence: Array.from({ length: 5 }, (_, index) => index + 1) },
  ];

  constructor (public dialog: MatDialog, private exportProductCartService: ExportProductCartService, private estoqueService: EstoqueService){
    this.transactions.forEach(transaction => {
      this.selected.push(1);
    });
  }
  ngOnInit(){
    this.exportProductCartService.mensagem$.subscribe((mensagem)=>{
      this.estoqueService.getUserById(mensagem).subscribe((product: any) => {

       this.productTest = product
        // this.productAdded = {
        //   Id: product.Id,
        //   Name: product.Name,
        //   Description: product.Description,
        //   Price: product.Price,
        //   Quantity: product.Quantity
        // }
      })
      console.log('PRODUTO COLETADO >>> ', this.productTest)
    })
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

  MetodoPai(mensagem: string){
    console.log('Metodo Pai acionado', mensagem)
  }
  AddProduct(id: string){
    console.log(id)
    // const newProduct: Transaction = {
    //   item: "Product01",
    //   cost: 76,
    //   quantidade: 50,
    //   quantidadeSequence: Array.from({ length: 50 }, (_, index) => index + 1)
    // }
  }
}
