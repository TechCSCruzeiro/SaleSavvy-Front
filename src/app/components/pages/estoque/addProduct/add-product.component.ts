import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { AuthenticationService } from 'src/app/service/auth.service';
import { EstoqueService } from 'src/app/service/estoque.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { ConvertCurrency } from 'src/app/function/ConvertCurrency';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup
  UserId: string = ''

  constructor(
    private estoqueService: EstoqueService, 
    public messagesSucessService: MessagesSuccessService, 
    public messagesErrorService: MessagesErrorService, 
    private router: Router, 
    private authService: AuthenticationService,
    ) {

    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.UserId = decodeToken.employeeId
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])
    })
  }

  get name() {
    return this.productForm.get('name')!
  }
  get description() {
    return this.productForm.get('description')!
  }
  get price() {
    return this.productForm.get('price')!
  }
  get quantity() {
    return this.productForm.get('quantity')!
  }

  FormProduct(form: FormGroup): Product {
    const converter = new ConvertCurrency();
    return {
      Id: '',
      Name: form.get('name')!.value,
      UserID: this.UserId,
      Description: form.get('description')!.value,
      Price: converter.formatCurrencyToNumber(form.get('price')!.value),
      Quantity: Number(form.get('quantity')!.value),
    }
  }

  submit() {

    if (this.productForm.invalid) {
      return;
    }
    const product: Product = this.FormProduct(this.productForm)
    console.log(product)
    this.estoqueService.createProduct(product).subscribe((response) => {
      this.messagesSucessService.add("Produto Criado com sucesso")
      this.router.navigate(['/estoque'])
    }, (error) => {
      this.messagesErrorService.add('Erro ao Criar o produto ' + error.error)
      this.router.navigate(['/estoque'])
      console.log("Erro ao Criar o Produto", error)
    })
  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}
