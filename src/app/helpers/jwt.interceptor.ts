import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { AuthenticationService } from '../service/auth.service';

  @Injectable()

  export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}
  
    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      // Verifique se o usuário está autenticado
      if (this.authService.isAuthenticated()) {
        // Obtenha o token JWT do serviço de autenticação
        const token = localStorage.getItem('access-token');
  
        // Clone a solicitação e adicione o cabeçalho de autorização
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      return next.handle(request);
    }
  }