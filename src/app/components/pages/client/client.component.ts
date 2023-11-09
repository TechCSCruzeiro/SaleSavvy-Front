import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/Models/Client';
import { ModalRemoveClientComponent } from './modal-remove-client/modal-remove-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditClientComponent } from './modal-edit-client/modal-edit-client.component';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'street', 'actions'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  client: Client[] = [
    {
      Id: "6594b91e-a027-4db2-85b2-f37f6726b194",
      Name: "Piassa Alves da silva Silveira",
      Email: "piassa@email.com",
      Phone: "11968395467",
      Address: { Number: "10", Code: "06824425", State: "Sp", City: "Embu das Artes", District: "Jardim Angela", Street: "Rua Marfim" },
      UserID: "94837c79-ec70-41ce-8b1a-695d2ebdc5df"
    },
    {
      Id: "6594b91e-a027-4db2-85b2-f37f6726b194",
      Name: "Piassa Alves da silva Silveira",
      Email: "piassa@email.com",
      Phone: "11968395467",
      Address: { Number: "10", Code: "06824425", State: "Sp", City: "Embu das Artes", District: "Jardim Angela", Street: "Rua Marfim" },
      UserID: "94837c79-ec70-41ce-8b1a-695d2ebdc5df"
    },
    {
      Id: "6594b91e-a027-4db2-85b2-f37f6726b194",
      Name: "Piassa Alves da silva Silveira",
      Email: "piassa@email.com",
      Phone: "11968395467",
      Address: { Number: "10", Code: "06824425", State: "Sp", City: "Embu das Artes", District: "Jardim Angela", Street: "Rua Marfim" },
      UserID: "94837c79-ec70-41ce-8b1a-695d2ebdc5df"
    },
    {
      Id: "6594b91e-a027-4db2-85b2-f37f6726b194",
      Name: "Piassa Alves da silva Silveira",
      Email: "piassa@email.com",
      Phone: "11968395467",
      Address: { Number: "10", Code: "06824425", State: "Sp", City: "Embu das Artes", District: "Jardim Angela", Street: "Rua Marfim" },
      UserID: "94837c79-ec70-41ce-8b1a-695d2ebdc5df"
    }
  ]

  constructor(
    public dialog: MatDialog,
  ) {

    this.dataSource = new MatTableDataSource(this.client);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
