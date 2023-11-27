import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/Models/Client';
import { ModalRemoveClientComponent } from './modal-remove-client/modal-remove-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditClientComponent } from './modal-edit-client/modal-edit-client.component';
import { ClientService } from 'src/app/service/client.service';
import { AuthenticationService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'street', 'actions'];
  dataSource: MatTableDataSource<Client>;
  UserId: string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private clientService: ClientService,
    private authService: AuthenticationService
  ) 
  {
    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.UserId = decodeToken.employeeId

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.clientService.postListClient(this.UserId).subscribe(clients =>{
      this.dataSource.data = clients
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogRemove(clientId: string, nameClient: string) {
    const dialogRef = this.dialog.open(ModalRemoveClientComponent, {
      width: '400px',
      data: { clientId: clientId, nameClient: nameClient }
    })
}

openDialogUpdate(clientId: string) {
  const dialogRef = this.dialog.open(ModalEditClientComponent, {
    width: '500px',
    data: { clientId: clientId },
  })
}

}
