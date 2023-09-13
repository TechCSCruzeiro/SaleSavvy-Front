import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {
  userId!: string;
  name!: string;


  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private usuarioService: UsuarioService,
  public messagesSuccessService: MessagesSuccessService,
  public messagesErrorService: MessagesErrorService,
  private router: Router,
  private dialogRef: MatDialogRef<RemoveUserComponent>
  )
  {
    this.userId = data.userId
    this.name = data.nameUser
  }

  ngOnInit(): void {
    
  }

  FecharModal(){
    this.dialogRef.close();
  }

  RemoveUser(){
    this.usuarioService.deleteUser(this.userId).subscribe((response) =>{
      this.FecharModal();
      this.messagesSuccessService.add("Usuario deletado com sucesso! ")

      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    },(error)=>{
      this.FecharModal();
      this.messagesErrorService.add("Ocorreu um erro ao deletar o usuario: " + error.error)
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      console.log(error)
    })
  }

}
