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
  }
  
  ngOnInit() {
    this.importClientSaleService.Guid$.subscribe(async (guidUser) => {
      const response = await this.clientService.postClientById(guidUser).toPromise();
      this.modifyClient(response);
      if (this.client) {
        this.importClientSaleService.changeClient(this.client);
      }
    });
  }
  
  modifyClient(client: any){
    this.client = {
      Id: client.id,
      Name: client.name,
      Email: client.email,
      Phone: client.phone,
      UserID: client.userId,
      Address: {
        Code: client.address.code,
        State: client.address.state,
        City: client.address.city,
        District: client.address.district,
        Street: client.address.street,
        Number: client.address.number
      }
    };
  }

  ModalAddClient() {
    const dialogRef = this.dialog.open(ModalLocateClientComponent, {
      width: 'auto',
    })
  }
}
