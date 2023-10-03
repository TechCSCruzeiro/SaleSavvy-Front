import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { EstoqueService } from 'src/app/service/estoque.service';
import { Product } from 'src/app/Models/Product';
import { ConvertCurrency } from 'src/app/function/ConvertCurrency';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent implements OnInit{

  productId!:string;
  product!: Product;
  productForm!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private estoqueService: EstoqueService,
  public messagesSucessService: MessagesSuccessService, 
  public messagesErrorService: MessagesErrorService,
  private router: Router,
  private dialogRef: MatDialogRef<ModalEditProductComponent>
  ){
    this.productId = data.productId
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
    const updateProduct: Product = this.FormProduct(this.productForm)
    this.estoqueService.updateUser(updateProduct).subscribe((response) =>{
      this.FecharModal();
      this.messagesSucessService.add("Produto alterado com sucesso")
      this.router.navigate(['/estoque'])
    },(error)=>{
      this.FecharModal();
      this.messagesErrorService.add("Ocorreu erro ao alterar o produto " + error.error)
      this.router.navigate(['/estoque'])
      console.log(error)
    })
  }

}
