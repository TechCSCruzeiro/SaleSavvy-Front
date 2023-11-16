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
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]),
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
      Name: form.get('name')!.value,
      Email: form.get('email')!.value,
      Password: form.get('senha')!.value,
    }
  }

  submit() {
    if (this.usuarioForm.invalid) {
      return;
    }
    const usuario: Usuario = this.FormUsuario(this.usuarioForm)
    this.usuarioService.createUser(usuario).subscribe((response) =>{
      this.messagesSucessService.add("Usuario Criado Com sucesso")
      this.router.navigate(['/'])
    },(error) =>{
      const returnApi = error
      console.log("Retorno da API > ", returnApi)
      this.messagesErrorService.add('Erro ao Criar o usuario ' + error.error)
      this.router.navigate(['/'])
    })
  }
}
