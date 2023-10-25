import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/Models/Product';
import { AuthenticationService } from 'src/app/service/auth.service';
import { EstoqueService } from 'src/app/service/estoque.service';
import { ExportProductCartService } from 'src/app/service/export-productCart.Service';


const productData: Product[] = [];

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.css']
})
export class ModalAddProductComponent implements OnInit {

  @Output() eventAddProduct = new EventEmitter<string>()

  displayedColumns: string[] = ['name','description','price','quantity'];
  //dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  selectedProduct!: Product;
  UserId: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ModalAddProductComponent>,
  private estoqueService: EstoqueService,
  private authService: AuthenticationService,
  private exportProductCartService: ExportProductCartService,

  )
  { 
    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.UserId = decodeToken.employeeId
  }

   async ngOnInit(){
    try {
      const products = await this.estoqueService.getProduts(this.UserId).toPromise();
      if(products){
        this.dataSource.data = products
      }else{
        console.log("ERRO AO LISTAR PRODUTOS: ")
      }
      
    } catch (err) {

    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addToCart(id: string){
    this.exportProductCartService.enviarMensagem(id)
  }



}
