import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';
import { Product } from 'src/app/Models/Product';
import { CheckoutService } from 'src/app/service/checkout.service';

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

  constructor(
    private checkoutService: CheckoutService,
  ) {

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
    });
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

  finalizePurchase() {
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
          viewValue: this.paymentControl.value.viewValue
        };
      }

      console.log(this.payment)
      console.log("Produtos> > ", this.products)
    }

  }
}
