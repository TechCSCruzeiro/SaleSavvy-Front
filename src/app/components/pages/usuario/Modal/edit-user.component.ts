import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidationPassword } from 'src/app/function/ValidationPassword';
import { Router } from '@angular/router';

import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit{
  userId!:string;
  user!: Usuario;
  usuarioForm!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private usuarioService: UsuarioService, public messagesSucessService: MessagesSuccessService, public messagesErrorService: MessagesErrorService ,private router: Router ){
    this.userId = data.userId
  }

  ngOnInit() {
    this.usuarioService.getUserById(this.userId).subscribe(user => {
      this.user = user

      this.usuarioForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required]),
        senha2: new FormControl('', [Validators.required]),
        permissao: new FormControl(''),
      }, {validators: ValidationPassword()});
    })
  }

  get name() {
    return this.usuarioForm.get('name')!
  }

  get email() {
    return this.usuarioForm.get('email')!
  }
  get senha() {
    return this.usuarioForm.get('senha')!
  }
  get senha2() {
    return this.usuarioForm.get('senha2')!
  }

  submit(){
    if (this.usuarioForm.invalid){
      console.log("Invalido")
    }
  }
}
