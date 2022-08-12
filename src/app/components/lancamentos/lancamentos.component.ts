import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonAlertService } from '../button-alert/button-alert.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent implements OnInit, OnDestroy {

  fieldAlert: boolean = false;
  message: string = ''
  status: string = ''
  loading: boolean = false;

  subs: Subscription[] = [];

  constructor(
    private buttonAlertService: ButtonAlertService
  ) { }

  ngOnInit(): void {
    this.fieldAlertValues();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
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

    const sub4 = this.buttonAlertService.loading.subscribe({
      next: value => this.loading = value
    })

    this.subs.push(sub1, sub2, sub3, sub4)
  }

}
