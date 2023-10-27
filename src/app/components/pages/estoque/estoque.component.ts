import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EstoqueService } from 'src/app/service/estoque.service';
import { Product } from 'src/app/Models/Product';
import { ModalEditProductComponent } from './modal-edit-product/modal-edit-product.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ModalRemoveProductComponent } from './modal-remove-product/modal-remove-product.component';
import { AuthenticationService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'creationDate', 'acoes'];
  dataSource: MatTableDataSource<Product>;
  productId!: string;
  userId: string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private estoqueService: EstoqueService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService
    ){
    this.dataSource = new MatTableDataSource();

    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.userId = decodeToken.employeeId
  }

  async ngAfterViewInit() {
    this.spinner.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    try {
      const products = await this.estoqueService.getProduts(this.userId).toPromise();
      if(products){
        this.dataSource.data = products;
      }else{
        this.dataSource.data = []
      }
    } catch (err) {
      console.log("Erro ao obter os produtos", err);
    }
    this.spinner.hide()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(productId: string) {
    const dialogRef = this.dialog.open(ModalEditProductComponent, {
      width: '400px', // Defina a largura do modal conforme necessário
      data: { productId: productId }
    })
  }

  openDialogRemove(productId: string, nameProduct: string) {
    const dialogRef = this.dialog.open(ModalRemoveProductComponent, {
      width: '400px', 
      data: {productId: productId, nameProduct: nameProduct}
    })

  }
}



