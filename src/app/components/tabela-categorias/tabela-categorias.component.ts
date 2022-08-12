import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { ICategoria } from 'src/app/interfaces/ICategoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ButtonAlertService } from '../button-alert/button-alert.service';
import { Subscription } from 'rxjs';
import { FormularioCategoriaService } from '../formulario-categorias/formulario-categoria.service';
import { FormularioCategoriasComponent } from '../formulario-categorias/formulario-categorias.component';

@Component({
  selector: 'app-tabela-categorias',
  templateUrl: './tabela-categorias.component.html',
  styleUrls: ['./tabela-categorias.component.scss']
})
export class TabelaCategoriasComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<ICategoria>;

  decricaoCategoria: string = ''
  tipoCategoria: string = ''
  credito: string = 'c'
  debito: string = 'd'
  loading: boolean = false;

  categorias: ICategoria[] = [
    {
      descricao: this.decricaoCategoria,
      tipo: this.tipoCategoria
    }
  ];

  displayedColumns = ['descricao', 'tipo', 'action'];

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
    private categoriaService: CategoriaService,
    private windowService: NbWindowService,
    private buttonAlertService: ButtonAlertService,
    private formularioCategoriaService: FormularioCategoriaService
  ) { }

  ngOnInit(): void {
    this.get();
    this.fieldAlertValues();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  get() {
    this.categoriaService.get()
      .subscribe({
        next: p => {
          this.categorias = p

        },
        error: err => console.log(err)
      })
  }

  deleteCategory(id: string) {
    this.buttonAlertService.loading.next(true);
    this.categoriaService.delete(id)
      .subscribe({
        next: info => {
          this.onAlert('Categoria deletada com sucesso.', 'success')
          this.get();
          this.buttonAlertService.loading.next(false);
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.buttonAlertService.loading.next(false);
        }
      })
  }

  openWindowUpdate(id: string, descricao: string, tipo: string) {
    this.categoriaService.idUpdate = id;
    this.categoriaService.updateNowValidator.next(true);
    this.formularioCategoriaService.descricao.next(descricao);
    this.formularioCategoriaService.tipo.next(tipo);

    const windowRef = this.windowService.open(FormularioCategoriasComponent, { title: `Atualização de Categoria`, buttons: this.buttonsConfig });
    windowRef.onClose.subscribe(() => {
      this.categoriaService.updateNowValidator.next(false);
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
