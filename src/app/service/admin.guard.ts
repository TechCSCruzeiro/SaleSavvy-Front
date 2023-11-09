import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { MessagesErrorService } from './messages-error.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router,
        public messagesErrorService: MessagesErrorService,
    ) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
            return true;
        } else {
            this.messagesErrorService.add("Você não tem permissão para acessar essa pagina! ")
            this.router.navigate(['/login']);
            return false;
        }
    }
}
