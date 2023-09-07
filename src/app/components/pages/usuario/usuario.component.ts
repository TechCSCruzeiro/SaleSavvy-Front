import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/service/usuario.service';

import { ValidationPassword } from 'src/app/function/ValidationPassword';
import { Usuario } from 'src/app/Models/Usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioForm!: FormGroup

  constructor(private usuarioService: UsuarioService) {
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
     console.log("Usuario Criado com Sucesso")
    },(error) =>{
      console.log("Erro ao Criar o Usuario", error)
    })
  }
}
