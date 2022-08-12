import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { URL_API } from '../../environments/environment'
import { ICategoria } from '../interfaces/ICategoria';
import { Utils } from '../Utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  header = new HttpHeaders({
    'Authorization': `Bearer ${Utils.getToken('token')}`
  })

  idUpdate: string = ''

  updateNowValidator = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  save(descricao: string | null | undefined, tipo: string | null | undefined){
    const body = {
      "descricao": descricao,
      "tipo": tipo
    }

    return this.http.post<ICategoria>(`${URL_API}/categorias`, body, {headers: this.header})

  }

  get(){
    return this.http.get<ICategoria[]>(`${URL_API}/categorias`, {headers: this.header})
  }

  delete(id: string){
    return this.http.delete(`${URL_API}/categorias/${id}`, {headers: this.header})
  }

  update(descricao: string | null | undefined, tipo: string | null | undefined){

    const body = {
      "descricao": descricao,
      "tipo": tipo	
    }

    return this.http.put(`${URL_API}/categorias/${this.idUpdate}`, body,{headers: this.header})
  }
}
