import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICharts } from '../components/home-grafico/ICharts';
import { LancamentoService } from '../services/lancamento.service';

@Injectable({
  providedIn: 'root'
})
export class ChartValuesResolver implements Resolve<ICharts[]> {

  constructor(private lancamentoService: LancamentoService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICharts[]> {

    const data: ICharts[] = []
    this.lancamentoService.get().subscribe({
      next: lancamentos => {
        const receitas = lancamentos.filter(l => l.tipo_conta == 1)
        const despesas = lancamentos.filter(l => l.tipo_conta == 2)

        data.push(
          {
            name: 'Receitas',
            value: receitas.length
          },
          {
            name: 'Despesas',
            value: despesas.length
          }
        )
      },
      error: err => console.log(err)
    })

    return of(data)

  }
}
