import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/Models/Address';
import { Client } from 'src/app/Models/Client';
import { AuthenticationService } from 'src/app/service/auth.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { VendaService } from 'src/app/service/venda.service';
import { Subject, takeUntil } from 'rxjs';
import { ImportClientSaleService } from 'src/app/service/import-clientSale.service';


@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  disabled = false;
  clienteForm!: FormGroup
  addressForm!: Address
  errorCEP!: string
  UserId!: string
  client!:Client
  private destroy$ = new Subject<void>();

  constructor(
    private vendaService: VendaService,
    private renderer: Renderer2,
    public messagesSucessService: MessagesSuccessService,
    public messagesErrorService: MessagesErrorService,
    private authService: AuthenticationService,
    private importClientSaleService: ImportClientSaleService,
  ) {
    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.UserId = decodeToken.employeeId
   }

  ngOnInit(): void {
    this.importClientSaleService.currentClient.pipe(takeUntil(this.destroy$)).subscribe(client => {
      if (client) {
        this.client = client
      }
    });

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

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  formatPhone(event: any) {
    let inputValue = event.target.value.replace(/\D/g, '');
    const isElevenDigits = inputValue.length === 11;
    const isOverElevenDigits = inputValue.length > 11;

    if (isElevenDigits || isOverElevenDigits) {

      inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    }

    this.clienteForm.get('phone')!.setValue(inputValue);
  }

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

  FormClient(form: FormGroup): Client {
    return {
      Name: form.get('name')!.value,
      Email: form.get('email')!.value,
      Phone: form.get('phone')!.value,
      UserID: this.UserId,
      Address: this.SearchAddress(form.value)
    }
  }

  SearchCEP() {
    const cepValue = this.clienteForm.get('cep')!.value;
    this.vendaService.getAddress(cepValue).subscribe((response) => {
      this.addressForm = this.SearchAddress(response)
      if ('erro' in response && response.erro === true) {
        this.errorCEP = "CEP não encontrado"
        setTimeout(()=> {
          this.errorCEP = ""
        }, 3000
        );
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
      this.messagesErrorService.add('Erro ao encontrar o CEP!')
    })
  }

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
      this.messagesErrorService.add('Erro ao cadastrar o cliente! ')
    })
  }
}
