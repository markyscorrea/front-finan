import { Component, OnInit } from '@angular/core';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
