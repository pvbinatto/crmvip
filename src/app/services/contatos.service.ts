import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  SERVER_URL = 'https://turin.novakio.com.br/api'; 

  constructor(private http: HttpClient) { }

  public getClientes(){
    return this.http.get(this.SERVER_URL + '/clientes');
  }
}
