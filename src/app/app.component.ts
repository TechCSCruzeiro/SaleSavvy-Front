import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoginPage = false;

  constructor(private authService: AuthenticationService){
  }

  ngOnInit(){

    this.isLoginPage = this.authService.isAuthenticated()
  }

}