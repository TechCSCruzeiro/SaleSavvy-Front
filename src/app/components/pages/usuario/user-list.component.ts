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
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormsModule, Validators, FormGroupDirective, NgForm,
  ReactiveFormsModule  } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/service/usuario.service';
import { EditUserComponent } from './Modal/edit-user.component';
import { Usuario } from 'src/app/Models/Usuario';
import { RemoveUserComponent } from './Modal/remove-user.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import { AuthenticationService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatButtonToggleModule, FormsModule, NgIf, MatDialogModule,MatProgressSpinnerModule,NgxSpinnerModule, MatMenuModule,MatSelectModule,ReactiveFormsModule, MatRadioModule]
})
export class TableOverviewExample implements AfterViewInit {
  

  displayedColumns: string[] = ['id', 'name', 'email', 'acoes'];
  dataSource: MatTableDataSource<Usuario>;
  userId!: string;
  permission: string = ""

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.spinner.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.usuarioService.getUsers().subscribe(users => {
      this.dataSource.data = users;
    })
    this.spinner.hide()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  convertToString(value: boolean): string {
    return value.toString()
  }

  modifyPermission(permission: any, userID: string){
    console.log("Premissão",permission.value, "ID do USUARIO: ", userID)
  }

  clickedRows = new Set<any>();

  openDialog(userId: string) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px',
      data: { userId: userId },
    })
  }
  openDialogRemove(userId: string, nameUser: string) {
    const dialogRef = this.dialog.open(RemoveUserComponent, {
      width: '400px',
      data: { userId: userId, nameUser: nameUser }
    })

  }

}
