import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../environments/environment'
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  headers = new HttpHeaders({
    'Authorization': `Bearer `
  });

  options = {
    headers: this.headers
  };

  constructor(
    private http: HttpClient
  ) { }

  login(email: string | null | undefined, password: string | null | undefined){

    const body = {
      "email": email,
      "senha": password
    }

    return this.http.post<IUsuario>(`${URL_API}/usuarios/login`, body)
  }

  register(nome: string | null | undefined, email: string | null | undefined, password: string | null | undefined){
    const body = {
      "nome": nome,
      "email": email,
      "senha": password
    }

    return  this.http.post<IUsuario>(`${URL_API}/usuarios/cadastro`, body)
  }

}
