import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/Models/Address';
import { Client } from 'src/app/Models/Client';
import { AuthenticationService } from 'src/app/service/auth.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
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
  errorCEP!: string
  UserId!: string

  constructor(
    private vendaService: VendaService,
    private renderer: Renderer2,
    public messagesSucessService: MessagesSuccessService,
    public messagesErrorService: MessagesErrorService,
    private authService: AuthenticationService
  ) {
    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.UserId = decodeToken.employeeId
   }

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(14)],),
      email: new FormControl('', [Validators.required, Validators.email]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
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
  get street() {
    return this.clienteForm.get('street')!
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
  get district() {
    return this.clienteForm.get('district')!
  }
  get uf() {
    return this.clienteForm.get('uf')!
  }

  //Limpar Formulario: 
  clearForm() {
    this.clienteForm.get('name')!.setValue('');
    this.clienteForm.get('phone')!.setValue('');
    this.clienteForm.get('email')!.setValue('');
    this.clienteForm.get('street')!.setValue('');
    this.clienteForm.get('number')!.setValue('');
    this.clienteForm.get('cep')!.setValue('');
    this.clienteForm.get('city')!.setValue('');
    this.clienteForm.get('district')!.setValue('');
    this.clienteForm.get('uf')!.setValue('');
  }

  //Bloqueando Letras, Permitindo apenas Numero
  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  //Formatando para (XX)XXXXX-XXXX
  formatPhone(event: any) {
    let inputValue = event.target.value.replace(/\D/g, '');
    const isElevenDigits = inputValue.length === 11;
    const isOverElevenDigits = inputValue.length > 11;

    if (isElevenDigits || isOverElevenDigits) {

      inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    }

    this.clienteForm.get('phone')!.setValue(inputValue);
  }

  //Convertendo em Address
  SearchAddress(address: any): Address {
    const city = address.localidade || address.city;
    const district = address.bairro || address.district;
    const address_ = address.logradouro || address.street;
    const number = address.number || null
    return {
      Code: address.cep,
      State: address.uf,
      City: city,
      District: district,
      Number: number,
      Street: address_
    }
  }

  //Convertendo em Client
  FormClient(form: FormGroup): Client {
    return {
      Name: form.get('name')!.value,
      Email: form.get('email')!.value,
      Phone: form.get('phone')!.value,
      UserID: this.UserId,
      Address: this.SearchAddress(form.value)
    }
  }

  //Buscando endereço pelo CEP na API VIACEP
  SearchCEP() {
    const cepValue = this.clienteForm.get('cep')!.value;
    this.vendaService.getAddress(cepValue).subscribe((response) => {
      this.addressForm = this.SearchAddress(response)
      if ('erro' in response && response.erro === true) {
        this.errorCEP = "CEP não encontrado"
      } else {
        this.renderer.setProperty(document.getElementById('uf'), 'value', this.addressForm.State.toLowerCase());
        const { name, email, phone, number } = this.clienteForm.value;
        this.clienteForm.setValue({
          name,
          phone,
          email,
          street: this.addressForm.Street,
          number,
          district: this.addressForm.District,
          cep: cepValue,
          city: this.addressForm.City,
          uf: this.addressForm.State
        });
      }
    }, (error) => {
      const returnApi = error
      console.log(returnApi)
    })
  }

  //Enviando formulario para Back-end
  submit() {
    if (this.clienteForm.invalid) {
      return;
    }
    const client: Client = this.FormClient(this.clienteForm)
    this.vendaService.createClient(client).subscribe((response) => {
      this.messagesSucessService.add('Cliente criado com sucesso')
      this.clearForm()
      this.disabled = false
    }, (erro) => {
      console.log(client)
      console.log(erro)
    })
  }
}
