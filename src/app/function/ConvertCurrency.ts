export class ConvertCurrency {

  formatCurrencyToNumber(currencyValue: string): number {
    // Verifica se a variável currencyValue é do tipo string
    if (typeof currencyValue !== 'string') {
      // Converte a variável currencyValue para o tipo string
      currencyValue = String(currencyValue);
    }

    // Remove todas as vírgulas e pontos
    const cleanedValue = currencyValue.replace(/[,.R$]/g, '');
    const numeroTrans = Number(cleanedValue)
    const numeroFormatado = this.addpoint(numeroTrans)

    return isNaN(numeroFormatado) ? 0 : numeroFormatado;
  }

  addpoint(numero: number): number {
    // Converte o número para uma string
    const numeroString = numero.toString();

    // Verifica se o número tem pelo menos dois dígitos
    if (numeroString.length < 2) {
      return Number(numeroString); // Não é possível adicionar ponto, retorna o número original
    }

    // Divide a string em duas partes: parte antes dos dois últimos dígitos e os dois últimos dígitos
    const parteAntes = numeroString.slice(0, -2);
    const ultimosDoisDigitos = numeroString.slice(-2);

    // Formata a string com um ponto entre as duas partes
    const numeroFormatado = `${parteAntes}.${ultimosDoisDigitos}`;

    return Number(numeroFormatado);
  }

}