import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormatter]'
})
export class CurrencyFormatterDirective {
  @Input() currency: string = 'BRL';

  private originalValue: string = ''; // Variável para armazenar o valor original

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.originalValue = input.value; // Armazena o valor original
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const formattedValue = this.formatCurrency(value, this.currency); // Formata o valor na moeda selecionada
    input.value = formattedValue;
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = this.originalValue; // Restaura o valor original quando o campo perde o foco
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