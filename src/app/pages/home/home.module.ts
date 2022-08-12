import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbAlertModule, NbBadgeModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTooltipModule, NbTreeGridModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { LancamentosComponent } from 'src/app/components/lancamentos/lancamentos.component';
import { CategoriasComponent } from 'src/app/components/categorias/categorias.component';
import { PessoasComponent } from 'src/app/components/pessoas/pessoas.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstPageModule } from '../first-page/first-page.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TabelaPessoasComponent } from 'src/app/components/tabela-pessoas/tabela-pessoas.component';
import { FormularioPessoasComponent } from 'src/app/components/formulario-pessoas/formulario-pessoas.component';
import { FormularioCategoriasComponent } from 'src/app/components/formulario-categorias/formulario-categorias.component';
import { TabelaCategoriasComponent } from 'src/app/components/tabela-categorias/tabela-categorias.component';
import { FormularioLancamentosComponent } from 'src/app/components/formulario-lancamentos/formulario-lancamentos.component';
import { TabelaPessoasPesquisaComponent } from 'src/app/components/tabela-pessoas-pesquisa/tabela-pessoas-pesquisa.component';
import { TabelaCategoriasPesquisaComponent } from 'src/app/components/tabela-categorias-pesquisa/tabela-categorias-pesquisa.component';
import { TabelaLancamentosComponent } from 'src/app/components/tabela-lancamentos/tabela-lancamentos.component';
import { TabelaReceitasComponent } from 'src/app/components/tabela-receitas/tabela-receitas.component';
import { TabelaDespesasComponent } from 'src/app/components/tabela-despesas/tabela-despesas.component';
import { FormularioLancamentoUpdateComponent } from 'src/app/components/formulario-lancamento-update/formulario-lancamento-update.component';
import { HomeGraficoComponent } from 'src/app/components/home-grafico/home-grafico.component';
import{ NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataPagamentoComponent } from 'src/app/components/data-pagamento/data-pagamento.component';

@NgModule({
  declarations: [
    HomeComponent,
    LancamentosComponent,
    CategoriasComponent,
    PessoasComponent,
    AvatarComponent,
    TabelaPessoasComponent,
    FormularioPessoasComponent,
    FormularioCategoriasComponent,
    TabelaCategoriasComponent,
    LancamentosComponent,
    FormularioLancamentosComponent,
    TabelaPessoasPesquisaComponent,
    TabelaCategoriasPesquisaComponent,
    TabelaLancamentosComponent,
    TabelaReceitasComponent,
    TabelaDespesasComponent,
    FormularioLancamentoUpdateComponent,
    HomeGraficoComponent,
    DataPagamentoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbTabsetModule,
    NbSelectModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    FirstPageModule,
    NbSpinnerModule,
    NbTreeGridModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NbWindowModule.forChild(),
    NbTooltipModule,
    NbFormFieldModule,
    NbDatepickerModule.forRoot(),
    NbTreeGridModule,
    NbCheckboxModule,
    CurrencyMaskModule,
    NgxChartsModule,
    NbBadgeModule,
    NbCalendarModule
  ]
})
export class HomeModule { }
