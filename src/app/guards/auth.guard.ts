import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/Utils/utils';
import { LancamentoService } from '../services/lancamento.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private lancamentoService: LancamentoService
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = Utils.getToken('token')
    if (!token) {
      return this.authRecused();
    }
    this.lancamentoService.getValuesChart()
    return true;
  }

  authRecused() {
    Utils.clearStorage();
    this.router.navigate(['/login'])
    return false;
  }

}
