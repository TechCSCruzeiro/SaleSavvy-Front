
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {NgIf, JsonPipe} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { VendaComponent } from './components/pages/venda/venda.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadearComponent } from './components/headear/headear.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt'
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import {MatButtonToggleModule} from '@angular/material/button-toggle'

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
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
import { AuthenticationService } from './service/auth.service';
import { AddProductComponent } from './components/pages/estoque/addProduct/add-product.component';
import { CurrencyFormatterDirective } from './currency-formatter.directive';
import { ModalEditProductComponent } from './components/pages/estoque/modal-edit-product/modal-edit-product.component';
import { ModalRemoveProductComponent } from './components/pages/estoque/modal-remove-product/modal-remove-product.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { ProductCardComponent } from './components/pages/venda/product-card/product-card.component';
import { ModalAddProductComponent } from './components/pages/venda/modal-add-product/modal-add-product.component';
import {MatRippleModule} from '@angular/material/core';
import { ViewClientComponent } from './components/pages/venda/view-client/view-client.component';
import { ModalLocateClientComponent } from './components/pages/venda/view-client/modal-locate-client/modal-locate-client.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PaymentComponent } from './components/pages/venda/payment/payment.component';
import { RelatorioComponent } from './components/pages/relatorio/relatorio.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';

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
    AddProductComponent,
    CurrencyFormatterDirective,
    ModalEditProductComponent,
    ModalRemoveProductComponent,
    ProductCardComponent,
    ModalAddProductComponent,
    ViewClientComponent,
    ModalLocateClientComponent,
    PaymentComponent,
    RelatorioComponent,

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
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRippleModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    JsonPipe,
    MatNativeDateModule,
    MatStepperModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access-token');
        }
      }
    }),

  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
