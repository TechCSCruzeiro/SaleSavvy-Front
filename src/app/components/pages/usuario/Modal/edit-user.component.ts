import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit{
  userId!:string;
  user!: Usuario;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private usuarioService: UsuarioService){
    this.userId = data.userId
  }

  ngOnInit() {
    this.usuarioService.getUserById(this.userId).subscribe(user => {
      this.user = user
    })
  }

  Info(){
    console.log(this.user)
  }
}
