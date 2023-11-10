import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EstoqueService } from 'src/app/service/estoque.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';

@Component({
  selector: 'app-modal-remove-product',
  templateUrl: './modal-remove-product.component.html',
  styleUrls: ['./modal-remove-product.component.css']
})
export class ModalRemoveProductComponent {

  productId!: string;
  name!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private estoqueService: EstoqueService,
    public messagesSuccessService: MessagesSuccessService,
    public messagesErrorService: MessagesErrorService,
    private router: Router,
    private dialogRef: MatDialogRef<ModalRemoveProductComponent>
  ) {
    this.productId = data.productId
    this.name = data.nameProduct
  }

  FecharModal() {
    this.dialogRef.close();
  }

  RemoveProduct() {
    this.estoqueService.deleteProduct(this.productId).subscribe((response) => {
      this.FecharModal();
      this.messagesSuccessService.add("Produto deletado com sucesso! ")
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }, (error) => {
      this.FecharModal();
      this.messagesErrorService.add("Ocorreu um erro ao deletar o Produto: " + error.error)
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    })
  }

}
