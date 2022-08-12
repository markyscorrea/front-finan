import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ButtonAlertService } from '../button-alert/button-alert.service';
import { FormularioCategoriaService } from './formulario-categoria.service';

@Component({
  selector: 'app-formulario-categorias',
  templateUrl: './formulario-categorias.component.html',
  styleUrls: ['./formulario-categorias.component.scss']
})
export class FormularioCategoriasComponent implements OnInit, OnDestroy {

  selectedItem = '';
  loading: boolean = false;
  @Input() actionButton: string = 'Atualizar'
  updateNow: boolean = false;

  descricao: string = '';
  tipo: string = '';

  categoriaForm = new FormGroup({
    descricao: new FormControl(this.descricao, Validators.required),
    tipo: new FormControl(this.tipo, Validators.required)
  })

  subs: Subscription[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private buttonAlertService: ButtonAlertService,
    private formularioCategoriaService: FormularioCategoriaService,
    @Optional() protected windowRef: NbWindowRef
  ) { }

  ngOnInit(): void {
    this.formValue()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

  submit() {
    const descricaoValid = this.categoriaForm.controls.descricao.errors
    const tipoValid = this.categoriaForm.controls.tipo.errors

    if (descricaoValid?.['required']) {
      this.onAlert('Preencha os campos!', 'danger')
    }else if(tipoValid?.['required']) {
      this.onAlert('Preencha o tipo de categoria!', 'danger')
    }else{
      this.updateValidation()
      if (this.updateNow) {
        this.update(this.categoriaForm.value.descricao, this.categoriaForm.value.tipo)
      } else {
        this.save(this.categoriaForm.value.descricao, this.categoriaForm.value.tipo)
      }
    }

  }

  save(descricao: string | null | undefined, tipo: string | null | undefined){

    this.buttonAlertService.loading.next(true);
    
    this.categoriaService.save(descricao, tipo)
      .subscribe({
        next: categoria => {
          this.onAlert('Categoria salva com sucesso!', 'success')
          this.categoriaForm.reset();
          this.buttonAlertService.loading.next(false);
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })

  }

  update(descricao: string | null | undefined, tipo: string | null | undefined) {
    this.buttonAlertService.loading.next(true);
    this.categoriaService.update(descricao, tipo)
      .subscribe({
        next: pessoa => {
          this.onAlert('Pessoa alterada com sucesso!', 'success')
          this.categoriaForm.reset()
          this.buttonAlertService.loading.next(false);
          this.categoriaService.updateNowValidator.next(false);
          this.windowRef.close();
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  updateValidation() {
    const sub = this.categoriaService.updateNowValidator.subscribe({
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
    const sub1 = this.formularioCategoriaService.descricao.subscribe({
      next: value => {
        this.descricao = value
      }
    })
    const sub2 = this.formularioCategoriaService.tipo.subscribe({
      next: value => {
        this.tipo = value
      }
    })

    this.subs.push(sub1, sub2)
  }

}
