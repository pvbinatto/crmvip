import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getHeader(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({ token: '' + token });
    const requestOptions = { headers: header };
    return requestOptions;
  }

  async getInvoicesLocal(){
    const result = await this.http
      .get<any>(`${environment.api}/invoices/`, this.getHeader())
      .toPromise();
    return result;
  }

  async getInvoicesWS(codigoInterno: any) {
    const result = await this.http
      .get<any>(`${environment.api}/invoices/getbyclient/${codigoInterno}`, this.getHeader())
      .toPromise();
    return result;
  }
}
