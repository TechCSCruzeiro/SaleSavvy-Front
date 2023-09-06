import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  usuarioForm!: FormGroup

  constructor(private usuarioService: UsuarioService){
  }

  ngOnInit(): void{
    this.usuarioForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      permissao: new FormControl(''),
    });
  }

  get nome() {
    return this.usuarioForm.get('nome')!
  }

  criarUsuario(){

  }

  submit(){
    console.log('Enviou formulario');
  }
}
