import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Format } from 'src/app/Utils/convert';
import { ButtonAlertService } from '../button-alert/button-alert.service';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { TabelaPessoasPesquisaComponent } from '../tabela-pessoas-pesquisa/tabela-pessoas-pesquisa.component';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { Subscription } from 'rxjs';
import { TabelaCategoriasPesquisaComponent } from '../tabela-categorias-pesquisa/tabela-categorias-pesquisa.component';

@Component({
  selector: 'app-formulario-lancamentos',
  templateUrl: './formulario-lancamentos.component.html',
  styleUrls: ['./formulario-lancamentos.component.scss']
})
export class FormularioLancamentosComponent implements OnInit, OnDestroy {

  selectedItemTipo = '';
  selectedItemTipoConta = '';
  loading: boolean = false;
  @Input() actionButton: string = 'Atualizar'
  updateNow: boolean = false;

  lancamentoForm = new FormGroup({
    descricao: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    tipo_conta: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required)

  })

  pessoaValue: string = ''
  categoriaValue: string = ''

  subs: Subscription[] = [];

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  constructor(
    private buttonAlertService: ButtonAlertService,
    private lancamentoService: LancamentoService,
    private windowService: NbWindowService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

  submit() {

    this.buttonAlertService.loading.next(true);

    const descricaoValid = this.lancamentoForm.controls.descricao.errors
    const valorValid = this.lancamentoForm.controls.valor.errors
    const tipoContaValid = this.lancamentoForm.controls.tipo_conta.errors
    const tipoValid = this.lancamentoForm.controls.tipo.errors
    const dataValid = this.lancamentoForm.controls.data.errors

    if (descricaoValid?.['required'] ||
      valorValid?.['required'] ||
      tipoContaValid?.['required'] ||
      tipoValid?.['required'] ||
      !this.pessoaValue ||
      dataValid?.['required']
    ) {
      this.onAlert('Preencha os campos!', 'danger')
    }

    const descricao = this.lancamentoForm.value.descricao
    const valor = Format.value(this.lancamentoForm.value.valor)
    const tipo_conta = Format.value(this.lancamentoForm.value.tipo_conta)
    const tipo = this.lancamentoForm.value.tipo
    const data = Format.date(this.lancamentoForm.value.data)

    this.lancamentoService.save(descricao, valor, tipo_conta, tipo, data)
      .subscribe({
        next: lancamento => {
          this.onAlert('Lançamento cadastrado com sucesso!', 'success')
          this.clearForm();
          this.buttonAlertService.loading.next(false);
          this.lancamentoService.getValuesChart();
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  clearForm(){
    this.lancamentoForm.reset();
    this.pessoaValue = '';
    this.categoriaValue = '';
  }

  onAlert(info: string, status: string) {
    this.buttonAlertService.message.next(info);
    this.buttonAlertService.status.next(status);
    this.buttonAlertService.fieldAlert.next(true);
    setTimeout(() => {
      this.buttonAlertService.fieldAlert.next(false);
    }, 3000)
  }

  openWindowPessoa() {
    const windowRef = this.windowService.open(TabelaPessoasPesquisaComponent, { title: `Seleção de Pessoa`, buttons: this.buttonsConfig });

    windowRef.onClose.subscribe(() => {
      const sub = this.lancamentoService.nomePessoa.subscribe({
        next: value => {
          this.pessoaValue = value
        }
      })

      this.subs.push(sub);

    });
  }

  openWindowCategoria() {
    const windowRef = this.windowService.open(TabelaCategoriasPesquisaComponent, { title: `Seleção de Categoria`, buttons: this.buttonsConfig });

    windowRef.onClose.subscribe(() => {
      const sub = this.lancamentoService.nomeCategoria.subscribe({
        next: value => {
          this.categoriaValue = value
        }
      })

      this.subs.push(sub);

    });
  }

}
