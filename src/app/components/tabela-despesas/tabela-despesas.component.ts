import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { ILancamento } from 'src/app/interfaces/ILancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ButtonAlertService } from '../button-alert/button-alert.service';
import { DataPagamentoComponent } from '../data-pagamento/data-pagamento.component';
import { FormularioLancamentoUpdateComponent } from '../formulario-lancamento-update/formulario-lancamento-update.component';

@Component({
  selector: 'app-tabela-despesas',
  templateUrl: './tabela-despesas.component.html',
  styleUrls: ['./tabela-despesas.component.scss']
})
export class TabelaDespesasComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<ILancamento>;

  fieldAlert: boolean = false;
  message: string = ''
  status: string = ''
  loading: boolean = false;


  displayedColumns = ['descricao', 'status','valor','data', 'action'];

  despesas: ILancamento[] = [
    {
      _id: '',
      descricao: '',
      valor: '',
      data_vencimento: '',
      tipo_conta: 0,
      tipo: '',
      pessoa: '',
      status: true
    }
  ]

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  constructor(
    private lancamentoService: LancamentoService,
    private buttonAlertService: ButtonAlertService,
    private windowService: NbWindowService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.lancamentoService.get()
      .subscribe({
        next: lancamentos => {

          const pesquisaLancamentos = lancamentos.filter(l => l.tipo_conta == 2)

          this.despesas = pesquisaLancamentos
        },
        error: err => console.log(err)
      })
  }

  openWindowUpdate(id: string, descricao: string, valor: number, tipo_conta: number, data_entrada: string, tipo: string) {
    this.lancamentoService.idUpdate = id;
    this.lancamentoService.tipoContaUpdate = tipo_conta;
    this.lancamentoService.tipoUpdate = tipo;
    const windowRef = this.windowService.open(FormularioLancamentoUpdateComponent, { title: `Atualização de Despesa`, buttons: this.buttonsConfig });
    windowRef.onClose.subscribe(() => {
      this.get();
    });
  }

  deleteDespesa(id: string) {
    this.buttonAlertService.loading.next(true);
    this.lancamentoService.delete(id)
      .subscribe({
        next: info => {
          this.onAlert('Despesa deletada com sucesso.', 'success')
          this.get();
          this.buttonAlertService.loading.next(false);
          this.lancamentoService.getValuesChart();
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  informarPagamento(id: string){
    this.lancamentoService.idPagamento = id
    const windowRef = this.windowService.open(DataPagamentoComponent, { title: `Informe a data do pagamento`, buttons: this.buttonsConfig });
    windowRef.onClose.subscribe(() => {
      this.get();
    });
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
