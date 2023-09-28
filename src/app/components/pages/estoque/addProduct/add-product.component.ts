import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EstoqueService } from 'src/app/service/estoque.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  productForm!: FormGroup

  constructor(private estoqueService: EstoqueService, public messagesSucessService: MessagesSuccessService, public messagesErrorService: MessagesErrorService ,private router: Router ){
    
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
        
    })
  }
}
