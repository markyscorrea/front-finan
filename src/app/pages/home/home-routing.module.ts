import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from 'src/app/components/categorias/categorias.component';
import { HomeGraficoComponent } from 'src/app/components/home-grafico/home-grafico.component';
import { LancamentosComponent } from 'src/app/components/lancamentos/lancamentos.component';
import { PessoasComponent } from 'src/app/components/pessoas/pessoas.component';
import { ChartValuesResolver } from 'src/app/guards/chart-values.resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'lancamentos',
        component: LancamentosComponent
      },
      {
        path: 'categorias',
        component: CategoriasComponent
      },
      {
        path: 'pessoas',
        component: PessoasComponent
      },
      {
        path: 'dashboard',
        component: HomeGraficoComponent,
        resolve: { ChartValue: ChartValuesResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
