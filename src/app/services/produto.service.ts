import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  private produtos = {};
  emitirProdutos = new EventEmitter();
  static enviouProdutos = new EventEmitter();

  getHeader(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({ token: '' + token });
    const requestOptions = { headers: header };
    return requestOptions;
  }

  async getProdutosWs() {
    const result = await this.http
      .get<any>(`${environment.api}/products/products_category/`, this.getHeader())
      .toPromise();
    return result;
  }

  getProdutos() {
    return this.produtos;
  }

  setProdutos(produtos: any) {
    this.produtos = produtos;
    this.emitirProdutos.emit(produtos);
    ProdutoService.enviouProdutos.emit(produtos);
  }
}
