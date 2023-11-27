export class ConvertCurrency {

  formatCurrencyToNumber(currencyValue: string): number | null{
    if (typeof currencyValue !== 'string') {
      currencyValue = String(currencyValue);
    }

    const cleanedValue = currencyValue.replace(/[,.R$]/g, '');
    const numeroTrans = Number(cleanedValue)
    const numeroFormatado = this.addpoint(numeroTrans)

    return isNaN(numeroFormatado) ? null : numeroFormatado;
  }

  addpoint(numero: number): number {
    const numeroString = numero.toString();

    if (numeroString.length < 2) {
      return Number(numeroString);
    }

    const parteAntes = numeroString.slice(0, -2);
    const ultimosDoisDigitos = numeroString.slice(-2);

    const numeroFormatado = `${parteAntes}.${ultimosDoisDigitos}`;

    return Number(numeroFormatado);
  }

}