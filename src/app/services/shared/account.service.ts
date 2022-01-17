import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  async login(user: any) {
    const result = await this.http.post<any>(`${environment.api}/empresa/login`, user).toPromise();
    if (result && result.status === 'confirmed') {
      window.localStorage.setItem('token', result.token);
      return result.status;
    } else {
      return result;
    }
    return false;
  }

  async verifyAccount(account: any) {
    account.cnpj = account.cnpj.replace(/\D/g,"");
    const result = await this.http.get<any>(`${environment.api}/business/verificacadastro/${account.cnpj}`).toPromise();
    return result;
  }

  async verificaToken(token: any){
    const result = await this.http.get<any>(`${environment.api}/business/verificatoken/${token}`).toPromise();
    return result;
  }

  async createAccount(business: any) {
    const result = await this.http.post<any>(`${environment.api}/business/`, business).toPromise();
    return result;
  }

  async enviaEmailAtivacao(business: any){
    const result = await this.http.post<any>(`${environment.api}/business/emailativacao`, business).toPromise();
    return result;
  }
}
