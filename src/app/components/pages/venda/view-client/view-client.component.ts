import { Component } from '@angular/core';
import { ModalLocateClientComponent } from './modal-locate-client/modal-locate-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ImportClientSaleService } from 'src/app/service/import-clientSale.service';
import { Client } from 'src/app/Models/Client';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent {
  client!: Client 

  constructor(
    public dialog: MatDialog,
    private importClientSaleService: ImportClientSaleService
  ){
  }

  ngOnInit(){
    this.client = {
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
    }}
    this.importClientSaleService.Guid$.subscribe((guidUser) => {
      console.log(guidUser)
      this.importClientSaleService.changeClient(this.client);
    })
  }

  ModalAddClient() {
    const dialogRef = this.dialog.open(ModalLocateClientComponent, {
      width: 'auto', // Defina a largura do modal conforme necessário
    })
  }
}
