import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Login } from 'src/app/Models/Login';
import { LoginService } from 'src/app/service/login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtConfig } from 'src/app/helpers/auth.config';

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

  constructor(private loginService: LoginService){

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
      localStorage.setItem('access-token', response.token)
      console.log(localStorage.setItem)
      const returnApi = response
      console.log(returnApi)
    }, (error)=>{
      console.log(error)
    })
  }

  isAuthenticated(){
    return !!localStorage.getItem('access-token')
  }
  
}
