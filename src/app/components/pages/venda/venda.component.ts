import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Address } from 'src/app/Models/Address';
import { VendaService } from 'src/app/service/venda.service';


@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  disabled = true;
  clienteForm!: FormGroup
  addressForm!: Address
  selected = 'option2';
  end: string = ""

constructor(private vendaService: VendaService){}

ngOnInit(): void {
  this.clienteForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    uf: new FormControl("", [Validators.required]),
  })
}

SearchAddress(address: any): Address{
  return {
    Code: address.cep,
    State: address.uf,
    City: address.localidade,
    District: address.bairro,
    Address: address.logradouro

  }
}

ModifyUF(){
  this.clienteForm.patchValue({
    uf: this.addressForm.State.toLowerCase()
  });
}

submit(){
  
}

SearchCEP(){
    this.end = "Rua glycerio almeida Maciel"
    this.vendaService.getAddress("04433-020").subscribe((response) => {
      this.addressForm = this.SearchAddress(response)
      this.ModifyUF();
      console.log(this.addressForm)
    },(error) => {
      const returnApi = error
      console.log(returnApi)
      console.log("teste Falso")
    })
}

}
