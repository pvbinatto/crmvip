import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient) {}

  private contratos = {};
  emitirContrato = new EventEmitter();
  static clicouContrato = new EventEmitter();

  getHeader(): { headers: HttpHeaders; } {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({ 'token': '' + token });
    const requestOptions = { headers: header };
    return requestOptions;
  }


  async verificaContratos(codigoInterno: any) {
    const result = await this.http
      .get<any>(
        `${environment.api}/contratoitem/selecionaporcliente/${codigoInterno}`,
        this.getHeader()
      )
      .toPromise();
    return result;
  }

  setContratoItem(contrato: any){
    this.contratos = contrato;
    this.emitirContrato.emit(contrato);
    ContratoService.clicouContrato.emit(contrato);
  }

  getContratoItem(){
    return this.contratos;
  }
}
