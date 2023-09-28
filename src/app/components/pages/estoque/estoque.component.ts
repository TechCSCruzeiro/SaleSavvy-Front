import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EstoqueService } from 'src/app/service/estoque.service';
import { Product } from 'src/app/Models/Product';



@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'creationDate', 'acoes'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private estoqueService: EstoqueService) {
    this.dataSource = new MatTableDataSource();
  }

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    try {
      const products = await this.estoqueService.getProduts().toPromise();
      if(products){
        this.dataSource.data = products;
      }else{
        this.dataSource.data = []
      }
    } catch (err) {
      console.log("Erro ao obter os produtos", err);
    }
    console.log(this.dataSource.data)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



