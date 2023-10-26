import { Component } from '@angular/core';
import { ModalLocateClientComponent } from './modal-locate-client/modal-locate-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ImportClientSaleService } from 'src/app/service/import-clientSale.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent {

  constructor(
    public dialog: MatDialog,
    private importClientSaleService: ImportClientSaleService
  ){
  }

  ngOnInit(){
    this.importClientSaleService.Guid$.subscribe((guidUser) => {
      console.log(guidUser)
    })
  }

  ModalAddClient() {
    const dialogRef = this.dialog.open(ModalLocateClientComponent, {
      width: 'auto', // Defina a largura do modal conforme necessário
    })
  }

}
