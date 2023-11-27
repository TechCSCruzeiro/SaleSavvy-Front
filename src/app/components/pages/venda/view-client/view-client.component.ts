import { Component } from '@angular/core';
import { ModalLocateClientComponent } from './modal-locate-client/modal-locate-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ImportClientSaleService } from 'src/app/service/import-clientSale.service';
import { Client } from 'src/app/Models/Client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent {
  client?: Client;

  constructor(
    public dialog: MatDialog,
    private importClientSaleService: ImportClientSaleService,
    private clientService: ClientService,
  ) { 
    this.client = {
      Id: '',
      Name: '',
      Email: '',
      Phone: '',
      UserID: '',
      Address: {
        Code: '',
        State: '',
        City: '',
        District: '',
        Street: '',
        Number: ''
      }
    };
  }
  
  ngOnInit() {
    this.importClientSaleService.Guid$.subscribe(async (guidUser) => {
      const response = await this.clientService.postClientById(guidUser).toPromise();
      console.log(response);
      // Atualiza a instância do cliente com os dados da resposta
      this.client = response ? {
        Id: response.Id,
        Name: response.Name,
        Email: response.Email,
        Phone: response.Phone,
        UserID: response.UserID,
        Address: response.Address ? {
          Code: response.Address.Code,
          State: response.Address.State,
          City: response.Address.City,
          District: response.Address.District,
          Street: response.Address.Street,
          Number: response.Address.Number
        } : {
          Code: '',
          State: '',
          City: '',
          District: '',
          Street: '',
          Number: ''
        }
      } : {
        Id: '',
        Name: '',
        Email: '',
        Phone: '',
        UserID: '',
        Address: {
          Code: '',
          State: '',
          City: '',
          District: '',
          Street: '',
          Number: ''
        }
      };
      console.log("CLIENTE: ",this.client)
      if (this.client) {
        this.importClientSaleService.changeClient(this.client);
      }
    });
  }
  
  ModalAddClient() {
    const dialogRef = this.dialog.open(ModalLocateClientComponent, {
      width: 'auto', // Defina a largura do modal conforme necessário
    })
  }
}
