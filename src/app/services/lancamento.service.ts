import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { URL_API } from '../../environments/environment'
import { ICharts } from '../components/home-grafico/ICharts';
import { ILancamento } from '../interfaces/ILancamento';
import { Utils } from '../Utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  header = new HttpHeaders({
    'Authorization': `Bearer ${Utils.getToken('token')}`
  })

  nomePessoa = new BehaviorSubject<string>('')
  nomeCategoria = new BehaviorSubject<string>('')

  totalChart: ICharts[] = []

  //Para Cadastro
  idPessoa: string = ''
  descricaoCategoria: string = ''
  tipoCategoria: string = ''

  //Para Atualização
  idUpdate: string = ''
  tipoContaUpdate: number = 0
  tipoUpdate: string = ''
  idPagamento: string = ''


  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<ILancamento[]>(`${URL_API}/lancamentos`, { headers: this.header })
  }

  getValuesChart() {
    return this.get().subscribe({
      next: lancamentos => {
        const receitas = lancamentos.filter(l => l.tipo_conta == 1)
        const despesas = lancamentos.filter(l => l.tipo_conta == 2)
        this.totalChart = [
          {
            name: 'Receitas',
            value: receitas.length
          },
          {
            name: 'Despesas',
            value: despesas.length
          }
        ]
      }
    })
  }

  save(descricao: string | null | undefined,
    valor: number | null | undefined,
    tipo_conta: number | null | undefined,
    tipo: string | null | undefined,
    data: string | null | undefined
  ) {

    const bodyReceita = {
      "descricao": descricao,
      "valor": valor,
      "tipo_conta": tipo_conta,
      "tipo": tipo,
      "data_entrada": data,
      "pessoa": this.idPessoa,
      "categoria": {
        "descricao": this.descricaoCategoria,
        "tipo": this.tipoCategoria
      }
    }

    const bodyDespesa = {
      "descricao": descricao,
      "valor": valor,
      "tipo_conta": tipo_conta,
      "tipo": tipo,
      "data_vencimento": data,
      "pessoa": this.idPessoa,
      "categoria": {
        "descricao": this.descricaoCategoria,
        "tipo": this.tipoCategoria
      }
    }

    if (tipo_conta == 1) {
      return this.http.post<ILancamento>(`${URL_API}/lancamentos`, bodyReceita, { headers: this.header })
    } else {
      return this.http.post<ILancamento>(`${URL_API}/lancamentos`, bodyDespesa, { headers: this.header })
    }
  }

  update(descricao: string | null | undefined,
    valor: number | null | undefined,
    data_entrada: string | null | undefined) {
    const bodyReceita = {
      "descricao": descricao,
      "valor": valor,
      "tipo_conta": this.tipoContaUpdate,
      "data_entrada": data_entrada,
      "tipo": this.tipoUpdate
    }

    const bodyDespesa = {
      "descricao": descricao,
      "valor": valor,
      "tipo_conta": this.tipoContaUpdate,
      "data_entrada": data_entrada,
      "tipo": this.tipoUpdate
    }

    if (this.tipoContaUpdate == 1) {
      return this.http.put(`${URL_API}/lancamentos/receita/${this.idUpdate}`, bodyReceita, { headers: this.header })
    } else {
      return this.http.put(`${URL_API}/lancamentos/despesa/${this.idUpdate}`, bodyDespesa, { headers: this.header })
    }
  }

  delete(id: string) {
    return this.http.delete(`${URL_API}/lancamentos/${id}`, { headers: this.header })
  }

  pay(data: string | null | undefined) {
    const body = {
      "data_pagamento": data,
      "status": true
    }

    return this.http.patch(`${URL_API}/lancamentos/despesa/${this.idPagamento}`, body, { headers: this.header })
  }

}
