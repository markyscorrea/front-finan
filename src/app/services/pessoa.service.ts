import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { URL_API } from '../../environments/environment'
import { IPessoa } from '../interfaces/IPessoa';
import { Utils } from '../Utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  header = new HttpHeaders({
    'Authorization': `Bearer ${Utils.getToken('token')}`
  })

  idUpdate: string = ''

  updateNowValidator = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  save(nome: string | null | undefined, cpf_cnpj: string | null | undefined, tipo: string | null | undefined){

    const body = {
      "nome": nome,
      "cpf_cnpj": cpf_cnpj,
      "tipo": tipo	
    }

    return this.http.post<IPessoa>(`${URL_API}/pessoas`, body, {headers: this.header})
  }

  get(){
    return this.http.get<IPessoa[]>(`${URL_API}/pessoas`, {headers: this.header})
  }

  delete(id: string){
    return this.http.delete(`${URL_API}/pessoas/${id}`, {headers: this.header})
  }

  update(nome: string | null | undefined, cpf_cnpj: string | null | undefined, tipo: string | null | undefined){

    const body = {
      "nome": nome,
      "cpf_cnpj": cpf_cnpj,
      "tipo": tipo	
    }

    return this.http.put(`${URL_API}/pessoas/${this.idUpdate}`, body,{headers: this.header})
  }

}
