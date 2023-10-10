import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private vendaService: VendaService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)],),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
    })
  }

  get name() {
    return this.clienteForm.get('name')!
  }
  get phone() {
    return this.clienteForm.get('phone')!
  }
  get email() {
    return this.clienteForm.get('email')!
  }
  get address() {
    return this.clienteForm.get('address')!
  }
  get number() {
    return this.clienteForm.get('number')!
  }
  get cep() {
    return this.clienteForm.get('cep')!
  }
  get city() {
    return this.clienteForm.get('city')!
  }
  get uf() {
    return this.clienteForm.get('uf')!
  }


  formatPhone(event: any) {
    const inputValue = event.target.value.replace(/\D/g, ''); // Remover não dígitos
    const formattedValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    this.clienteForm.get('phone')!.setValue(formattedValue);
  }

  updateCep(cepValue: string) {
    this.addressForm.Code = cepValue;
  }

  SearchAddress(address: any): Address {
    return {
      Code: address.cep,
      State: address.uf,
      City: address.localidade,
      District: address.bairro,
      Address: address.logradouro

    }
  }

  submit() {
  }

  SearchCEP() {
    console.log(this.clienteForm)
    const cepValue = this.clienteForm.get('cep')!.value;
    console.log(cepValue)
    this.vendaService.getAddress(cepValue).subscribe((response) => {
      console.log("ENTROU >> ", cepValue)
      this.addressForm = this.SearchAddress(response)
      this.renderer.setProperty(document.getElementById('uf'), 'value', this.addressForm.State.toLowerCase());

      const { name, email, phone, number } = this.clienteForm.value;


      this.clienteForm.setValue({
        name, // Preencha com o valor apropriado
        phone, // Preencha com o valor apropriado
        email, // Preencha com o valor apropriado
        address: this.addressForm.Address,
        number, // Preencha com o valor apropriado
        cep: cepValue,
        city: this.addressForm.City,
        uf: this.addressForm.State
      });
    }, (error) => {
      console.log("Valor >> ", cepValue)
      const returnApi = error
      console.log(returnApi)
      console.log("teste Falso")
    })
  }

}
