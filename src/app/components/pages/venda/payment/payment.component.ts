import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil, Subject, retry } from 'rxjs';
import { Product } from 'src/app/Models/Product';
import { SalesConfirmation } from 'src/app/Models/SalesConfirmation';
import { AuthenticationService } from 'src/app/service/auth.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { ImportClientSaleService } from 'src/app/service/import-clientSale.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { TransactionalService } from 'src/app/service/transactional.service';

interface Payment {
  value: string;
  viewValue: string;
  parcel?: number | null
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  optionParcel!: boolean
  paymentControl = new FormControl<Payment | null>(null, Validators.required);
  parcelControl = new FormControl<number | null>(null);
  payment: Payment | null = null;
  parcelas: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  selectedParcel?: number | null;
  private destroy$ = new Subject<void>();
  products!: Product[];
  clientID!: string
  userId!: string

  constructor(
    private checkoutService: CheckoutService,
    private importClientSaleService: ImportClientSaleService,
    public messagesErrorService: MessagesErrorService,
    private authService: AuthenticationService,
    private transactionalService: TransactionalService,
  ) {
    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.userId = decodeToken.employeeId
  }

  viewsPayments: Payment[] = [
    { value: 'pix', viewValue: 'Pix' },
    { value: 'credito', viewValue: 'Cartão de Credito' },
    { value: 'debito', viewValue: 'Cartão de Debito' },
  ];

  ngOnInit(): void {
    this.checkoutService.currentProducts.pipe(takeUntil(this.destroy$)).subscribe(product => {
      if (product) {
        this.products = product
      }
    })
    this.importClientSaleService.Guid$.subscribe((guidClient) => {
      this.clientID = guidClient
    })
  }

  getParcelValue(): number | null {
    if (this.products && this.parcelControl.value) {
      const totalValue = this.products.reduce((total, product) => total + (product.Price * product.Quantity), 0);
      return totalValue / this.parcelControl.value;
    }
    return null;
  }

  verifyPayment() {
    if (this.paymentControl.value?.value == 'credito') {
      this.optionParcel = true;
    } else {
      this.optionParcel = false;
      this.parcelControl.reset();
    }
  }

  convertSalesConfirmation(userId: string, clientId: string, products: Product[], quantityParcel: number, payment: string): SalesConfirmation{
    return {
      UserId: userId,
      ClientId: clientId,
      Product: products,
      QuantityParcel: quantityParcel,
      Payment: payment
    }
  }

  checkQuantity(products: any[]): boolean {
    if(!products){return true}
    return products.some(product => product.Quantity === 0);
  }

  finalizePurchase() {
    if(!this.clientID){
      this.messagesErrorService.add("Cliente não selecionado")
      return
    }

    if(this.checkQuantity(this.products)){
      this.messagesErrorService.add("Produto não selecionado ou quantidade não escolhida")
      return
    }
    if(!this.paymentControl.value){
      this.messagesErrorService.add("Pagamento não selecionado")
      console.log(this.payment)
      return
    }
    if (this.paymentControl.value) {
      if (this.paymentControl.value.value == 'credito') {
        this.payment = {
          value: this.paymentControl.value.value,
          viewValue: this.paymentControl.value.viewValue,
          parcel: this.parcelControl.value
        };
      } else {
        this.payment = {
          value: this.paymentControl.value.value,
          viewValue: this.paymentControl.value.viewValue,
        };
      }
      const confirmPayment =  this.convertSalesConfirmation(
        this.userId,
        this.clientID,
        this.products,
        this.payment.parcel ?? 0,
        this.payment.value)
        this.transactionalService.transaction(confirmPayment).subscribe((response)=>{
          alert('Venda finalizada com sucesso!');
          location.reload();
        },(error)=>{
          this.messagesErrorService.add('Ocorreu um erro ao processar a venda')
        })


        
    }
  }
}
