import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth.service';
import { Record } from 'src/app/Models/Record';
import { RecordService } from 'src/app/service/record.service';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';
import { MessagesErrorService } from 'src/app/service/messages-error.service';

interface RelatorioView {
  Name: string;
  ReportID: number;
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {

  UserId!: string

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  relatorioControl = new FormControl<RelatorioView | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  relatorio: RelatorioView[] = [
    { Name: 'Relatorio Movimetação do Estoque', ReportID: 1 },
    { Name: 'Relatorio de Estoque', ReportID: 2 },
  ];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private recordService: RecordService,
    public messagesSucessService: MessagesSuccessService,
    public messagesErrorService: MessagesErrorService,
  ) {
    const decodeToken = this.authService.decodeToken(localStorage.getItem('access-token'))
    this.UserId = decodeToken.employeeId
  }

  routerRecord() {
    if (this.relatorioControl.value) {
      const idRecord: any = this.relatorioControl.value
      switch (idRecord) {
        case 1:
          return {
            Router: 1,
            NameRecord: 'Relatorio Movimetação do Estoque.xlsx'
          }

        case 2:
          return {
            Router: 2,
            NameRecord: 'Relatorio do Estoque.xlsx'
          }
        default:
          console.log('Relatorio não encontrado')
          return
      }
    } else {
      return
    }

  }

  convert(params: any): Record {
    const infoReport = {
      UserId: params.UserId,
      StartDate: params.StartDate,
      EndDate: params.EndDate
    }
    return infoReport
  }

  convertReport() {
    const paramsReport = {
      UserId: this.UserId,
      StartDate: this.range.value.start ? this.range.value.start.toISOString().split('T')[0] : null,
      EndDate: this.range.value.end ? this.range.value.end.toISOString().split('T')[0] : null,
    }
    return this.convert(paramsReport)
  }

  generateReport() {
    //console.log(this.relatorioControl.value)
    const routerRecord = this.routerRecord()
    const params = this.convertReport()
    console.log(params)
    if (!routerRecord || !params.StartDate || !params.EndDate || this.range.invalid) {
      this.messagesErrorService.add('Erro! Verifique os campos selecionados ')
      return
    }

    if (routerRecord.Router === 1) {
      this.recordService.getIdMovimentStock(params).subscribe((response) => {
        console.log("Deu Certo: ", response)
        this.recordService.getdownloadRecord(response).subscribe(data => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = routerRecord.NameRecord;
          link.click();

          window.URL.revokeObjectURL(url);
        })

      }, (erro) => {
        this.messagesErrorService.add(`Ocorreu um erro ao gerar o relatorio: ${erro.erro}`)
      })
    }

    if (routerRecord.Router === 2) {
      this.recordService.getIdStock(params).subscribe((response) => {
        console.log("Deu Certo: ", response)
        this.recordService.getdownloadRecord(response).subscribe(data => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = routerRecord.NameRecord;
          link.click();

          window.URL.revokeObjectURL(url);
        })

      }, (erro) => {
        this.messagesErrorService.add(`Ocorreu um erro ao gerar o relatorio: ${erro.erro}`)
      })
    }
  }


}
