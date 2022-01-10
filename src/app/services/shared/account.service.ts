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

  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.api}/empresa`, account).toPromise();
    return result;
  }
}
