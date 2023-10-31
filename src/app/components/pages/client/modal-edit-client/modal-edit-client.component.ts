import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/Client';
import { ClientService } from 'src/app/service/client.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';

@Component({
  selector: 'app-modal-edit-client',
  templateUrl: './modal-edit-client.component.html',
  styleUrls: ['./modal-edit-client.component.css']
})
export class ModalEditClientComponent {
  userId!:string;
  client!: Client;
  clientForm!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
  private clientService: ClientService, 
  public messagesSucessService: MessagesSuccessService, 
  public messagesErrorService: MessagesErrorService,
  private router: Router,
  private dialogRef: MatDialogRef<ModalEditClientComponent>
  ){
    this.userId = data.userId
  }

  ngOnInit() {
    this.clientService.getClientById(this.userId).subscribe(
      (clients: any) => {
        this.client = {
          Id: clients.Id || '',
          Name: clients.Name || '',
          Email: clients.Email || '',
          Phone: clients.Phone || '',
          UserID: clients.UserID || '',
          Address: {
            Code: clients.Address.Code || '',
            State: clients.Address.State || '',
            City: clients.Address.City || '',
            District: clients.Address.District || '',
            Street: clients.Address.Street || '',
            Number: clients.Address.Number || '',
          }
        };
    })
      this.clientForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        code: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
      });
  }

  get name() {
    return this.clientForm.get('name')!
  }

  submit(){}
}
