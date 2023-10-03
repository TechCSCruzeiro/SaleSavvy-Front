import { Directive, HostListener, ElementRef,Input  } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormatter]'
})
export class CurrencyFormatterDirective {
  @Input() currency: string = 'BRL';

  constructor(private el: ElementRef) { }
  
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const formattedValue = this.formatCurrency(value, this.currency); // Formata o valor na moeda selecionada
    input.value = formattedValue;
  }

  formatCurrency(value: string, currency: string): string {
    const numberValue = parseFloat(value) / 100; // Converte centavos para reais
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}