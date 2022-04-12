import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, IterableDiffers } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class contratoItemService {
  constructor(private http: HttpClient) {}

  private contratoitem = {};
  emitirContrato = new EventEmitter();
  static enviouContrato = new EventEmitter();

  getHeader(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({ token: '' + token });
    const requestOptions = { headers: header };
    return requestOptions;
  }

  getContratoItem() {
    return this.contratoitem;
  }

  setContratoItem(contratoitem: any) {
    this.contratoitem = contratoitem;
    this.emitirContrato.emit(contratoitem);
    contratoItemService.enviouContrato.emit(contratoitem);
  }

  async addItemContrato(item: any) {
    const result = await this.http
      .post<any>(
        `${environment.api}/contratoitem/adiionaproduto/`,
        item,
        this.getHeader()
      )
      .toPromise();
    return result;
  }

  async removeItemContrato(item: any) {
    console.log(item);
    const result = await this.http
      .post<any>(
        `${environment.api}/contratoitem/removeProduto/`,
        item,
        this.getHeader()
      )
      .toPromise();
      console.log(result);
    return result;
  }
}
