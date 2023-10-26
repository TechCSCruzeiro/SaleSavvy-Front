import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAddProductComponent } from '../modal-add-product/modal-add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ExportProductCartService } from 'src/app/service/export-productCart.Service';
import { EstoqueService } from 'src/app/service/estoque.service';
import { Product } from 'src/app/Models/Product';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
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
  productAdded?: Product

  displayedColumns = ['description', 'quantity', 'price', 'valuetotal', 'actions'];
  transactions: Product[] = []
  transactionsDataSource!: MatTableDataSource<Product>

  constructor(public dialog: MatDialog,
    private exportProductCartService: ExportProductCartService,
    private estoqueService: EstoqueService,
    private cd: ChangeDetectorRef,
    public messagesSucessService: MessagesSuccessService, 
  public messagesErrorService: MessagesErrorService,
  ) {
    this.transactions.forEach(transaction => {
      this.selected.push(1);
    });
  }
  ngOnInit() {
    this.transactionsDataSource = new MatTableDataSource<Product>(this.transactions);
    this.transactionsDataSource.connect();
    this.exportProductCartService.mensagem$.subscribe((mensagem) => {
      if (typeof mensagem == undefined || mensagem == null) {
        console.log("Produto não localizado")
      } else {
        this.estoqueService.getUserById(mensagem).subscribe((product: any) => {
          this.productAdded = {
            Id: product.id,
            Name: product.name,
            Description: product.description,
            Price: product.price,
            Quantity: product.quantity,
            QuantityDisplay: Array.from({ length: product.quantity }, (_, index) => index + 1)
          }
          this.AddProduct(this.productAdded!)
        })

      }
    })
  }

  calculateTotalValue() {
    let totalValue = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      totalValue += this.transactions[i].Price * this.selected[i];
    }
    return totalValue;
  }


  ModalAddProduct() {
    const dialogRef = this.dialog.open(ModalAddProductComponent, {
      width: 'auto', // Defina a largura do modal conforme necessário
    })
  }

  removeProduct(index: number) {
    console.log(">>>> ", index)
    this.transactions.splice(index, 1);
    this.transactionsDataSource = new MatTableDataSource<Product>(this.transactions);
    this.cd.detectChanges();
  }

  AddProduct(product: Product) {
    if (product !== undefined) {
      const existingProduct = this.transactions.find(p => p.Id === product.Id);
      if (existingProduct) {
        this.messagesErrorService.add("Produto já adicionado")
        return;
      }
      this.transactions.push(product)
      this.transactionsDataSource = new MatTableDataSource<Product>(this.transactions);
      this.cd.detectChanges();
    }
  }
}
