import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  getHeader() {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({ 'token': '' + token });
    const requestOptions = { headers: header };
    return requestOptions;
  }

  async login(user: any) {
    const result = await this.http
      .post<any>(`${environment.api}/empresa/login`, user)
      .toPromise();
    if (result && result.status === 'confirmed') {
      window.localStorage.setItem('token', result.token);
      return result.status;
    } else {
      return result;
    }
    return false;
  }

  async verifyAccount(account: any) {
    account.cnpj = account.cnpj.replace(/\D/g, '');
    const result = await this.http
      .get<any>(`${environment.api}/business/verificacadastro/${account.cnpj}`)
      .toPromise();
    return result;
  }

  async verificaToken(token: any) {
    this.spinner.show();
    const result = await this.http
      .get<any>(`${environment.api}/business/verificatoken/${token}`)
      .toPromise();
      this.spinner.hide();
    return result;
  }

  async createAccount(business: any) {
    this.spinner.show();
    delete business.passwordConfirm;
    business.enabled = 1;
    const result = await this.http
      .post<any>(`${environment.api}/business/`, business)
      .toPromise();
      this.spinner.hide();
    return result;
  }

  async enviaEmailAtivacao(business: any) {
    const result = await this.http
      .post<any>(`${environment.api}/business/emailativacao`, business)
      .toPromise();
    return result;
  }

  async verificaContratos(codigoInterno: any) {
    const result = await this.http
      .get<any>(
        `${environment.api}/contrato/selecionaporcliente/${codigoInterno}`,
        this.getHeader()
      )
      .toPromise();
      console.log(result);
    return result;
  }
}
