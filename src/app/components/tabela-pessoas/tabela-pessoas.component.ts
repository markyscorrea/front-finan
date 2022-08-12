import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { IPessoa } from 'src/app/interfaces/IPessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { FormularioPessoasComponent } from '../formulario-pessoas/formulario-pessoas.component';
import { ButtonAlertService } from '../button-alert/button-alert.service';
import { Subscription } from 'rxjs';
import { FormularioPessoasService } from '../formulario-pessoas/formulario-pessoas.service';

@Component({
  selector: 'app-tabela-pessoas',
  templateUrl: './tabela-pessoas.component.html',
  styleUrls: ['./tabela-pessoas.component.scss']
})
export class TabelaPessoasComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<IPessoa>;

  nomePessoa: string = ''
  cpf_cnpjPessoa: string = ''
  tipoPessoa: string = ''
  pessoaFisica: string = 'Física'
  pessoaJuridica: string = 'Jurídica'
  loading: boolean = false;

  pessoas: IPessoa[] = [
    {
      nome: this.nomePessoa,
      cpf_cnpj: this.cpf_cnpjPessoa,
      tipo: this.tipoPessoa
    }
  ];

  displayedColumns = ['nome', 'cpf_cnpj', 'tipo', 'action'];

  fieldAlert: boolean = false;
  message: string = ''
  status: string = ''

  subs: Subscription[] = [];

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: false,
    maximize: false,
    fullScreen: false,
    close: true,
  };

  constructor(
    private pessoaService: PessoaService,
    private windowService: NbWindowService,
    private buttonAlertService: ButtonAlertService,
    private formularioPessoasService: FormularioPessoasService
    ) { }

  ngOnInit(): void {
    this.get();
    this.fieldAlertValues();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  get() {
    this.pessoaService.get()
      .subscribe({
        next: p => {
          this.pessoas = p

        },
        error: err => console.log(err)
      })
  }

  deletePerson(id: string) {
    this.buttonAlertService.loading.next(true);
    this.pessoaService.delete(id)
      .subscribe({
        next: info => {
          this.onAlert('Pessoa deletada com sucesso.', 'success')
          this.get();
          this.buttonAlertService.loading.next(false);
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  openWindowUpdate(id: string, nome: string, cpf_cnpj: string, tipo: string) {
    this.pessoaService.idUpdate = id;
    this.pessoaService.updateNowValidator.next(true);
    this.formularioPessoasService.nome.next(nome);
    this.formularioPessoasService.cpf_cnpj.next(cpf_cnpj);
    this.formularioPessoasService.tipo.next(tipo);

    const windowRef = this.windowService.open(FormularioPessoasComponent, { title: `Atualização de Pessoa`, buttons: this.buttonsConfig });
    windowRef.onClose.subscribe(() => {
      this.pessoaService.updateNowValidator.next(false);
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

  fieldAlertValues(){
    const sub1 = this.buttonAlertService.fieldAlert.subscribe({
      next: value => this.fieldAlert = value
    })

    const sub2 = this.buttonAlertService.message.subscribe({
      next: value => this.message = value
    })

    const sub3 = this.buttonAlertService.status.subscribe({
      next: value => this.status = value
    })

    this.subs.push(sub1, sub2, sub3);
  }
}
