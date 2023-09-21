import { Injectable, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private jwtHelper = new JwtHelperService();
  private Authenticated = false;

    authenticationChaged = new EventEmitter<boolean>();

  constructor() { }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    this.Authenticated = !this.jwtHelper.isTokenExpired(token)
    return this.Authenticated;
  }

  public login(token: string): void {
    localStorage.setItem('access-token', token);
    this.Authenticated = true;
    this.authenticationChaged.emit(true)
  }

  public logout(): void {
    localStorage.removeItem('access-token');
    this.Authenticated = false;
  }

  public getToken(): string | null {
    return localStorage.getItem('access-token');
  }
  public decodeToken (token: any){
    return this.jwtHelper.decodeToken(token)
  }
}