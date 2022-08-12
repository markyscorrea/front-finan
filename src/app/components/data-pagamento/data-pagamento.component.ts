import { Component, OnInit, Optional } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { Format } from 'src/app/Utils/convert';
import { ButtonAlertService } from '../button-alert/button-alert.service';

@Component({
  selector: 'app-data-pagamento',
  templateUrl: './data-pagamento.component.html',
  styleUrls: ['./data-pagamento.component.scss']
})
export class DataPagamentoComponent implements OnInit {

  date = new Date();

  loading: boolean = false;

  constructor(
    private lancamentoService: LancamentoService,
    private buttonAlertService: ButtonAlertService,
    @Optional() protected windowRef: NbWindowRef
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.buttonAlertService.loading.next(true);
    const dataPagamento = Format.date(this.date)
    this.lancamentoService.pay(dataPagamento)
      .subscribe({
        next: date => {
          this.onAlert('Pagamento informado com sucesso!', 'success')
          this.buttonAlertService.loading.next(false);
          this.windowRef.close();
        }, error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  onAlert(info: string, status: string) {
    this.buttonAlertService.message.next(info);
    this.buttonAlertService.status.next(status);
    this.buttonAlertService.fieldAlert.next(true);
    setTimeout(() => {
      this.buttonAlertService.fieldAlert.next(false);
    }, 3000)
  }

}
