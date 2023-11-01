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
  clientId!:string;
  client!: Client;
  clientForm!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
  private clientService: ClientService, 
  public messagesSucessService: MessagesSuccessService, 
  public messagesErrorService: MessagesErrorService,
  private router: Router,
  private dialogRef: MatDialogRef<ModalEditClientComponent>
  ){
    this.clientId = data.clientId
  }

  ngOnInit() {
    this.clientService.getClientById(this.clientId).subscribe(
      (clients: any) => {
        console.log(clients)
        this.client = {
          Id: clients.id || '',
          Name: clients.name || '',
          Email: clients.email || '',
          Phone: clients.phone || '',
          UserID: clients.userID || '',
          Address: {
            Code: clients.address.code || '',
            State: clients.address.state || '',
            City: clients.address.city || '',
            District: clients.address.district || '',
            Street: clients.address.street || '',
            Number: clients.address.number || '',
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
  get email() {
    return this.clientForm.get('email')!
  }
  get phone() {
    return this.clientForm.get('phone')!
  }
  get code() {
    return this.clientForm.get('code')!
  }
  get state() {
    return this.clientForm.get('state')!
  }
  get city() {
    return this.clientForm.get('state')!
  }
  get district() {
    return this.clientForm.get('district')!
  }
  get street() {
    return this.clientForm.get('street')!
  }
  get number() {
    return this.clientForm.get('number')!
  }

  submit(){}
}
