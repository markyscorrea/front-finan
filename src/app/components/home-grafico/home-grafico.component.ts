import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ICharts } from './ICharts';

@Component({
  selector: 'app-home-grafico',
  templateUrl: './home-grafico.component.html',
  styleUrls: ['./home-grafico.component.scss']
})
export class HomeGraficoComponent implements OnInit, OnDestroy {


  fieldAlert: boolean = false;
  message: string = ''
  status: string = ''
  loading: boolean = false;

  view: [number, number] = [790, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#2ce69b', '#ff3d71']
  };


  data: ICharts[] = [];

  subs: Subscription[] = [];

  constructor(private lancamentoService: LancamentoService, private route: ActivatedRoute) {
   
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (value) => {
        this.data = value?.['ChartValue']
      }
    })
  }

  ngOnDestroy(): void {
  }

}
