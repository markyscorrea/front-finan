import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { Format } from 'src/app/Utils/convert';
import { ButtonAlertService } from '../button-alert/button-alert.service';

@Component({
  selector: 'app-formulario-lancamento-update',
  templateUrl: './formulario-lancamento-update.component.html',
  styleUrls: ['./formulario-lancamento-update.component.scss']
})
export class FormularioLancamentoUpdateComponent implements OnInit {

  loading: boolean = false;
  @Input() actionButton: string = 'Atualizar'

  lancamentoUpdateForm = new FormGroup({
    descricao: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required)
  })

  constructor(
    private buttonAlertService: ButtonAlertService,
    private lancamentoService: LancamentoService,
    @Optional() protected windowRef: NbWindowRef
  ) { }

  ngOnInit(): void {
  }

  submit() {

    this.buttonAlertService.loading.next(true);

    const descricaoValid = this.lancamentoUpdateForm.controls.descricao.errors
    const valorValid = this.lancamentoUpdateForm.controls.valor.errors
    const dataValid = this.lancamentoUpdateForm.controls.data.errors

    if (descricaoValid?.['required'] ||
      valorValid?.['required'] ||
      dataValid?.['required']
    ) {
      this.onAlert('Preencha os campos!', 'danger')
      this.buttonAlertService.loading.next(false);
    } else {
      const descricao = this.lancamentoUpdateForm.value.descricao
      const valor = Format.value(this.lancamentoUpdateForm.value.valor)
      const data = Format.date(this.lancamentoUpdateForm.value.data)

      this.lancamentoService.update(descricao, valor, data)
        .subscribe({
          next: lancamento => {
            this.onAlert('Lançamento atualizado com sucesso!', 'success')
            this.windowRef.close();
            this.buttonAlertService.loading.next(false);
          },
          error: err => {
            this.onAlert(err.error.info, 'danger')
            this.buttonAlertService.loading.next(false);
          }
        })
    }

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
