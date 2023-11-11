import { Component, Inject, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/Models/Client';
import { AuthenticationService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';
import { ImportClientSaleService } from 'src/app/service/import-clientSale.service';


@Component({
  selector: 'app-modal-locate-client',
  templateUrl: './modal-locate-client.component.html',
  styleUrls: ['./modal-locate-client.component.css']
})
export class ModalLocateClientComponent implements AfterViewInit{

  @Output() eventAddClient = new EventEmitter<string>()

  displayedColumns: string[] = ['name', 'email', 'phone', 'street', 'code', 'city'];
  dataSource: MatTableDataSource<Client>;
  userId: string

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private importClientSaleService: ImportClientSaleService,
    private dialogRef: MatDialogRef<ModalLocateClientComponent>,
    private authService: AuthenticationService,
    private clientService: ClientService,
  ) {

    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.userId = decodeToken.employeeId

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    console.log("ID >>> ", this.userId);
    this.clientService.postListClient(this.userId).subscribe((clients: any[]) => {
      const clientsConverted: Client[] = clients.map((client) => {
        return {
          Id: client.id,
          Name: client.name,
          Email: client.email,
          Address: client.address,
          Phone: client.phone,
          UserID: client.userId,
        };
      });
      this.dataSource.data = clientsConverted;
    });
    console.log("LISTA DE CLIENTES", this.dataSource);
  }

  FecharModal(){
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addClient(guid: string){
    this.importClientSaleService.sendGuidUser(guid)
    this.FecharModal()
  }

}
