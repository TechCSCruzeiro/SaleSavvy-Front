import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/service/usuario.service';

import { ValidationPassword } from 'src/app/function/ValidationPassword';
import { Usuario } from 'src/app/Models/Usuario';


import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioForm!: FormGroup

  constructor(private usuarioService: UsuarioService, public messagesSucessService: MessagesSuccessService, public messagesErrorService: MessagesErrorService ,private router: Router ) {
  }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      senha2: new FormControl('', [Validators.required]),
      permissao: new FormControl(''),
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
      name: form.get('name')!.value,
      email: form.get('email')!.value,
      password: form.get('senha')!.value,
    }
  }

  submit() {
    if (this.usuarioForm.invalid) {
      return;
    }
    const usuario: Usuario = this.FormUsuario(this.usuarioForm)
    console.log(usuario)
    this.usuarioService.createUser(usuario).subscribe((response) =>{
      this.messagesSucessService.add("Usuario Criado Com sucesso")
      this.router.navigate(['/'])
    },(error) =>{
      this.messagesErrorService.add('Erro ao Criar o usuario ' + error.error)
      this.router.navigate(['/'])
      console.log("Erro ao Criar o Usuario", error)
    })
  }
}
