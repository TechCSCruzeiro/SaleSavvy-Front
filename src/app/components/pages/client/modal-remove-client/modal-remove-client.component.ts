import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';

@Component({
  selector: 'app-modal-remove-client',
  templateUrl: './modal-remove-client.component.html',
  styleUrls: ['./modal-remove-client.component.css']
})
export class ModalRemoveClientComponent {

  clientId!: string;
  name!: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private clientService: ClientService,
    public messagesSuccessService: MessagesSuccessService,
    public messagesErrorService: MessagesErrorService,
    private router: Router,
    private dialogRef: MatDialogRef<ModalRemoveClientComponent>
  ) {
    this.clientId = data.clientId
    this.name = data.nameClient
  }

  FecharModal(){
    this.dialogRef.close();
  }

  deleteClient() {
    this.clientService.deleteClient(this.clientId).subscribe((response) => {
      this.FecharModal();
      this.messagesSuccessService.add("Cliente deletado com sucesso! ")
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }, (error) => {
      this.FecharModal();
      this.messagesErrorService.add("Ocorreu um erro ao deletar o cliente: " + error.error)
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      console.log(error)
    })
  }

}
