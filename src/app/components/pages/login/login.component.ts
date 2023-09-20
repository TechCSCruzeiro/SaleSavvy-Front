import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Login } from 'src/app/Models/Login';
import { LoginService } from 'src/app/service/login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/auth.service';
import { AppComponent } from 'src/app/app.component';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login!: Login
  imagemSrc = 'assets/img/img-login-80.png';

  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])

  constructor(private loginService: LoginService, private authService: AuthenticationService,
    public messagesSucessService: MessagesSuccessService, 
    public messagesErrorService: MessagesErrorService,
    private router: Router,
    private location: Location
    ){

  }

  ngOnInit(){
    
  }

  convertLoginModel(email: string, password: string): Login{
    return{
      Email: email,
      Password: password
    }
  }

  submit(){
    this.login = this.convertLoginModel(this.emailFormControl.value!, this.passwordFormControl.value!)
    this.loginService.postLogin(this.login).subscribe((response: any) =>{
      this.authService.login(response.token)
      location.reload();
      this.messagesSucessService.add("Login feito com Sucesso")
    }, (error)=>{
      console.log(error)
      this.messagesErrorService.add('Erro ao Logar ' + error.error)
    })
  }

  isAuthenticated(){
    return !!localStorage.getItem('access-token')
  }
  
}
