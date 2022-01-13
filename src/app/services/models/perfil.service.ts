import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  async getPerfil() {
    const token = localStorage.getItem("token");
    const header = new HttpHeaders().set('token', `${token}`);
    const result = await this.http.get<any>(`${environment.api}/empresa/token/` + token, {headers: header}).toPromise();
    return result;
  }

  async setPerfil(perfil: any){
    console.log(perfil);
    const token = localStorage.getItem("token");
    const header = new HttpHeaders().set('token', `${token}`);
    const result = await this.http.post<any>(`${environment.api}/empresa`, perfil, {headers: header}).toPromise();
    return result;
  }
}
