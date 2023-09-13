import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationPassword } from 'src/app/function/ValidationPassword';
import { Router } from '@angular/router';

import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit{
  userId!:string;
  user!: Usuario;
  usuarioForm!: FormGroup
  confirmSenha!: string

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
  private usuarioService: UsuarioService, 
  public messagesSucessService: MessagesSuccessService, 
  public messagesErrorService: MessagesErrorService,
  private router: Router,
  private dialogRef: MatDialogRef<EditUserComponent>
  ){
    this.userId = data.userId
  }

  ngOnInit() {
    this.usuarioService.getUserById(this.userId).subscribe(
      (users: any) => {
        this.user = {
          Id: users.id || '',
          Name: users.name || '',
          Email: users.email || '',
          Password: users.password || '',
        };
      this.confirmSenha = this.user.Password
      console.log(this.user)
    })
      this.usuarioForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]),
        senha: new FormControl('', [Validators.required]),
        senha2: new FormControl('', [Validators.required]),
      }, {validators: ValidationPassword()});
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


  FormUsuario(form: FormGroup): Usuario {
    return {
      Id: this.userId,
      Name: form.get('name')!.value,
      Email: form.get('email')!.value,
      Password: form.get('senha')!.value,
    }
  }

  FecharModal(){
    this.dialogRef.close();
  }

  submit(){
    if (this.usuarioForm.invalid){
      return;
    }
    const updateUser: Usuario = this.FormUsuario(this.usuarioForm)
    this.usuarioService.updateUser(updateUser).subscribe((response)=>{
      this.messagesSucessService.add("Usuario Alterado com Sucesso")
      this.router.navigate(['/usuario/list'])
    },(error)=>{
      this.FecharModal();
      this.messagesErrorService.add("Ocorreu erro ao alterar o usuario: " + error.error)
      this.router.navigate(['/usuario/list'])
      console.log(error)
    })
  }
}
