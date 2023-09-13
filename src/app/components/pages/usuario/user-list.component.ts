import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/service/usuario.service';
import { EditUserComponent } from './Modal/edit-user.component';
import { Usuario } from 'src/app/Models/Usuario';
import { RemoveUserComponent } from './Modal/remove-user.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatButtonToggleModule, FormsModule, NgIf, MatDialogModule]
})
export class TableOverviewExample implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'acoes'];
  dataSource: MatTableDataSource<Usuario>;
  userId!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.usuarioService.getUsers().subscribe(users => {
      this.dataSource.data = users;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clickedRows = new Set<any>();

  openDialog(userId: string) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px', // Defina a largura do modal conforme necessário
      data: { userId: userId },
    })

  }
  openDialogRemove(userId: string, nameUser: string) {
    const dialogRef = this.dialog.open(RemoveUserComponent, {
      width: '400px', 
      data: {userId: userId, nameUser: nameUser}
    })

  }

}
