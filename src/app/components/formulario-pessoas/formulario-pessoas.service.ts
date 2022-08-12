import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioPessoasService {

  nome = new BehaviorSubject<string>('');
  cpf_cnpj = new BehaviorSubject<string>('');
  tipo = new BehaviorSubject<string>('');

  constructor() { }
}
