import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { EstoqueService } from 'src/app/service/estoque.service';
import { Product } from 'src/app/Models/Product';
import { ConvertCurrency } from 'src/app/function/ConvertCurrency';
import { AuthenticationService } from 'src/app/service/auth.service';
import { ModificProduct } from 'src/app/Models/ModificProduct';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent implements OnInit{

  productId!:string;
  product!: Product;
  productForm!: FormGroup
  userId: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private estoqueService: EstoqueService,
  public messagesSucessService: MessagesSuccessService, 
  public messagesErrorService: MessagesErrorService,
  private router: Router,
  private dialogRef: MatDialogRef<ModalEditProductComponent>,
  private authService: AuthenticationService,
  ){
    this.productId = data.productId

    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.userId = decodeToken.employeeId
  }

  ngOnInit() {

    this.estoqueService.getUserById(this.productId)
      .subscribe(
        (data: any) => {
          this.product = {
            Name: data.name || '',
            Description: data.description || '',
            Price: data.price || 0,
            Quantity: data.quantity || 0,
          };
        },
        error => {
          console.error('Ocorreu um erro ao buscar o produto:', error);
        }
      );
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
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

  ModificProductById(userId: string, form: FormGroup): ModificProduct{
    return {
      UserId: this.userId,
      Product: this.FormProduct(form)
    }
  }

  FormProduct(form: FormGroup): Product {
    const converter = new ConvertCurrency();
    return {
      Id: this.productId!,
      Name: form.get('name')!.value,
      Description: form.get('description')!.value,
      Price: converter.formatCurrencyToNumber(form.get('price')!.value),
      Quantity: Number(form.get('quantity')!.value),
    }
  }

  FecharModal(){
    this.dialogRef.close();
  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  submit(){
   if (this.productForm.invalid) {
      return;
    }
    const updateProduct: ModificProduct = this.ModificProductById(this.userId,this.productForm)
    console.log(updateProduct)
    this.estoqueService.updateUser(updateProduct).subscribe((response) =>{
      console.log(response)
      this.FecharModal();
      this.messagesSucessService.add("Produto alterado com sucesso")
      this.router.navigate(['/estoque'])
    },(error)=>{
      console.log(updateProduct)
      this.FecharModal();
      this.messagesErrorService.add("Ocorreu erro ao alterar o produto " + error.error)
      this.router.navigate(['/estoque'])
      console.log(error)
    })
  }

}
