import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/Models/Client';
import { ImportClientSaleService } from 'src/app/service/import-clientSale.service';


@Component({
  selector: 'app-modal-locate-client',
  templateUrl: './modal-locate-client.component.html',
  styleUrls: ['./modal-locate-client.component.css']
})
export class ModalLocateClientComponent {

  @Output() eventAddClient = new EventEmitter<string>()

  displayedColumns: string[] = ['name', 'email', 'phone', 'street', 'code', 'city'];
  dataSource: MatTableDataSource<Client>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private importClientSaleService: ImportClientSaleService 
  ) {
    this.dataSource = new MatTableDataSource<Client>([
      {
        Id: "6594b91e-a027-4db2-85b2-f37f6726b194",
        Name: "Rikelmi",
        Email: "Teste@Teste.com",
        Phone: "(11)98931-2399",
        UserID: "ID DO USUARIO",
        Address: {
          Code: "04433-020",
          State: "SP",
          City: "São Paulo",
          District: "JD.Itapura",
          Street: "Rua Glycerio Almeida Maciel",
          Number: "438"
        }
      }
    ]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addClient(guid: string){
    this.importClientSaleService.sendGuidUser(guid)
  }

}
