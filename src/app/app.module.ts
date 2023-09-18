
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {NgIf} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { VendaComponent } from './components/pages/venda/venda.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadearComponent } from './components/headear/headear.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt'; 

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';


import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'
import {MatListModule} from "@angular/material/list"
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EstoqueComponent } from './components/pages/estoque/estoque.component';
import { UsuarioComponent } from './components/pages/usuario/register-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesErrorComponent } from './components/messages/messages-error/messages-error.component';
import { MessagesSuccessComponent } from './components/messages/messages-success/messages-success.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/pages/usuario/Modal/edit-user.component';
import { RemoveUserComponent } from './components/pages/usuario/Modal/remove-user.component';
import { LoginComponent } from './components/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    VendaComponent,
    FooterComponent,
    HeadearComponent,
    EstoqueComponent,
    UsuarioComponent,
    MessagesComponent,
    MessagesErrorComponent,
    MessagesSuccessComponent,
    HomeComponent,
    EditUserComponent,
    RemoveUserComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    NgIf,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbAlert,
    NgbNavModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
