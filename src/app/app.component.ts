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
    console.log("NG ONN >> ", this.authService.isAuthenticated())
    console.log("Token", localStorage.getItem('access-token'))
    //this.authService.authenticationChaged.subscribe((isAuthenticated) => {
     // this.isLoginPage = isAuthenticated
      //console.log("NG ON INIT ENTROUUUU", this.isLoginPage)
    //})
  }

}