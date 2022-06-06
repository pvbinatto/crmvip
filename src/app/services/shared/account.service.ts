import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private loading: NgxSpinnerService) {}

  getHeader() {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({ token: '' + token });
    const requestOptions = { headers: header };
    return requestOptions;
  }

  getHeaderJson() {
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };
    return requestOptions;
  }

  corsHeader() {}

  async login(user: any) {
    const result = await this.http
      .post<any>(`${environment.api}/users/login`, user)
      .toPromise();
    return result;
  }

  async verifyAccount(account: any) {
    account.cnpj = account.cnpj.replace(/\D/g, '');
    const result = await this.http
      .get<any>(`${environment.api}/business/verificacadastro/${account.cnpj}`)
      .toPromise();
    return result;
  }

  async pesquisaCep(cep: any) {
    cep = cep.replace(/\D/g, '');
    const result = await this.http
      .get<any>(`https://viacep.com.br/ws/${cep}/json/`)
      .toPromise();
    return result;
  }

  async verificaHashUser(hash: any) {
    this.loading.show();
    const result = await this.http
      .get<any>(`${environment.api}/users/verificabyhash/${hash}`)
      .toPromise();
    this.loading.hide();
    return result;
  }

  async consultaCnpjReceita(cnpj: any) {
    console.log(cnpj);
    const result = await this.http
      .get<any>(`https://publica.cnpj.ws/cnpj/${cnpj}`, this.getHeaderJson())
      .toPromise();
      console.log(result);
      return result;    
  }

  async verificaToken(token: any) {
    this.loading.show();
    const result = await this.http
      .get<any>(`${environment.api}/business/verificatoken/${token}`)
      .toPromise();
    this.loading.hide();
    return result;
  }

  async createAccount(business: any) {
    this.loading.show();
    delete business.passwordConfirm;
    const result = await this.http
      .post<any>(`${environment.api}/business/`, business)
      .toPromise();
    this.loading.hide();
    return result;
  }

  async createUser(user: any) {
    delete user.passwordConfirm;
    const result = await this.http
      .post<any>(`${environment.api}/users`, user, this.getHeader())
      .toPromise();
    return result;
  }

  async updatePassword(user: any) {
    delete user.passwordConfirm;
    const result = await this.http
      .post<any>(
        `${environment.api}/users/updatepassword`,
        user,
        this.getHeader()
      )
      .toPromise();
    return result;
  }

  async enviaEmailAtivacao(business: any) {
    const result = await this.http
      .post<any>(`${environment.api}/business/emailativacao`, business)
      .toPromise();
    return result;
  }

  async resetPass(user: any) {
    const result = await this.http
      .post<any>(`${environment.api}/users/resetPass`, user)
      .toPromise();
    return result;
  }
}
