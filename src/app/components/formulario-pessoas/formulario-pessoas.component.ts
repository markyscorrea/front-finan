import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ButtonAlertService } from '../button-alert/button-alert.service';
import { FormularioPessoasService } from './formulario-pessoas.service';

@Component({
  selector: 'app-formulario-pessoas',
  templateUrl: './formulario-pessoas.component.html',
  styleUrls: ['./formulario-pessoas.component.scss']
})
export class FormularioPessoasComponent implements OnInit, OnDestroy {

  selectedItem = '';
  loading: boolean = false;
  @Input() actionButton: string = 'Atualizar'
  updateNow: boolean = false;

  nome: string = '';
  cpf_cnpj: string = '';
  tipo: string = '';

  pessoaForm = new FormGroup({
    nome: new FormControl(this.nome, Validators.required),
    cpf_cnpj: new FormControl(this.cpf_cnpj, Validators.required),
    tipo: new FormControl(this.tipo, Validators.required)
  })

  subs: Subscription[] = [];

  constructor(
    private pessoaService: PessoaService,
    private buttonAlertService: ButtonAlertService,
    private formularioPessoasService: FormularioPessoasService,
    @Optional() protected windowRef: NbWindowRef
  ) { 

  }

  ngOnInit(): void {
    this.formValue()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

  submit() {
    const nomeValid = this.pessoaForm.controls.nome.errors
    const cpf_cnpjValid = this.pessoaForm.controls.cpf_cnpj.errors
    const tipoValid = this.pessoaForm.controls.tipo.errors

    if (nomeValid?.['required']) {
      this.onAlert('Preencha os campos!', 'danger')
    } else if (cpf_cnpjValid?.['required']) {
      this.onAlert('Informe o CPF/CNPJ!', 'danger')
    } else if (tipoValid?.['required']) {
      this.onAlert('Informe o Tipo Pessoa!', 'danger')
    } else {
      this.updateValidation()
      if (this.updateNow) {
        this.update(this.pessoaForm.value.nome, this.pessoaForm.value.cpf_cnpj, this.pessoaForm.value.tipo)
      } else {
        this.save(this.pessoaForm.value.nome, this.pessoaForm.value.cpf_cnpj, this.pessoaForm.value.tipo)
      }
    }
  }

  save(nome: string | null | undefined, cpf_cnpj: string | null | undefined, tipo: string | null | undefined) {

    this.buttonAlertService.loading.next(true);

    this.pessoaService.save(nome, cpf_cnpj, tipo)
      .subscribe({
        next: pessoa => {
          this.onAlert('Pessoa salva com sucesso!', 'success')
          this.pessoaForm.reset()
          this.buttonAlertService.loading.next(false);
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  update(nome: string | null | undefined, cpf_cnpj: string | null | undefined, tipo: string | null | undefined) {
    this.buttonAlertService.loading.next(true);
    this.pessoaService.update(nome, cpf_cnpj, tipo)
      .subscribe({
        next: pessoa => {
          this.onAlert('Pessoa alterada com sucesso!', 'success')
          this.pessoaForm.reset()
          this.buttonAlertService.loading.next(false);
          this.pessoaService.updateNowValidator.next(false);
          this.windowRef.close();
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  updateValidation() {
    const sub = this.pessoaService.updateNowValidator.subscribe({
      next: value => {
        this.updateNow = value;
      }
    })

    this.subs.push(sub)
  }

  onAlert(info: string, status: string) {
    this.buttonAlertService.message.next(info);
    this.buttonAlertService.status.next(status);
    this.buttonAlertService.fieldAlert.next(true);
    setTimeout(() => {
      this.buttonAlertService.fieldAlert.next(false);
    }, 3000)
  }

  formValue(){
    const sub1 = this.formularioPessoasService.nome.subscribe({
      next: value => {
        this.nome = value
      }
    })

    const sub2 = this.formularioPessoasService.cpf_cnpj.subscribe({
      next: value => {
        this.cpf_cnpj = value
      }
    })

    const sub3 = this.formularioPessoasService.tipo.subscribe({
      next: value => {
        this.tipo = value
      }
    })

    this.subs.push(sub1, sub2, sub3)
  }
}
