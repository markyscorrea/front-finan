import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioCategoriaService {

  descricao = new BehaviorSubject<string>('');
  tipo = new BehaviorSubject<string>('');

  constructor() { }
}
