import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private loading: NgxSpinnerService, private router: Router) {}

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
    account.cnpj = account.company.cpfcnpj.replace(/\D/g, '');
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
    // return {
    //   atividades_secundarias: [
    //     {
    //       text: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação',
    //       code: '62.09-1-00',
    //     },
    //     {
    //       text: 'Atividades de intermediação e agenciamento de serviços e negócios em geral, exceto imobiliários',
    //       code: '74.90-1-04',
    //     },
    //     {
    //       text: 'Outras atividades de serviços prestados principalmente às empresas não especificadas anteriormente',
    //       code: '82.99-7-99',
    //     },
    //   ],
    //   qsa: [
    //     {
    //       nome: 'VITOR GUARINO OLIVIER',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'CRISTINA HELENA ZINGARETTI JUNQUEIRA',
    //       qual: '16-Presidente',
    //     },
    //     {
    //       nome: 'FRANCIS JOSEPH FUMAROLA',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'DAVID ADAM CURRIE',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'VANESSA ALESSI MANZI BINDER',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'GUILHERME MARQUES DO LAGO',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'LIVIA MARTINES CHANES',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'GUSTAVO DE MELO VASCONCELOS',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'JEREMY TAYLOR SELESNER',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'ALESSANDRO DA COSTA PRADO',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'HENRIQUE CAMOSSA SALDANHA FRAGELLI',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'ARTHUR FERREIRA VALADAO',
    //       qual: '10-Diretor',
    //     },
    //     {
    //       nome: 'BRUNO MAGRANI DE SOUZA',
    //       qual: '10-Diretor',
    //     },
    //   ],
    //   uf: 'SP',
    //   situacao: 'ATIVA',
    //   tipo: 'MATRIZ',
    //   nome: 'NU PAGAMENTOS S.A. - INSTITUICAO DE PAGAMENTO',
    //   bairro: 'PINHEIROS',
    //   atividade_principal: [
    //     {
    //       text: 'Administração de cartões de crédito',
    //       code: '66.13-4-00',
    //     },
    //   ],
    //   logradouro: 'R CAPOTE VALENTE',
    //   numero: '39',
    //   abertura: '04/06/2013',
    //   data_situacao: '04/06/2013',
    //   natureza_juridica: '205-4 - Sociedade Anônima Fechada',
    //   telefone: '(11) 2039-0650/ () 0000-0000',
    //   cep: '05.409-000',
    //   porte: 'DEMAIS',
    //   municipio: 'SAO PAULO',
    //   cnpj: '18.236.120/0001-58',
    //   ultima_atualizacao: '2022-06-03T14:54:56.755Z',
    //   status: 'OK',
    //   fantasia: '',
    //   complemento: '',
    //   email: '',
    //   efr: '',
    //   motivo_situacao: '',
    //   situacao_especial: '',
    //   data_situacao_especial: '',
    //   capital_social: '3687321644.00',
    //   extra: {},
    //   billing: {
    //     free: true,
    //     database: true,
    //   },
    // };

    const result = await this.http
      .get<any>(`/api/${cnpj}`, this.getHeaderJson()) //para fugir do cors, foi adicionado no arquivo proxy.conf.json um hack, lá está a url correta
      .toPromise();
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

  async addNovo(ob: any) {
    const result = await this.http
      .post<any>(`${environment.api}/business/insertNewBusiness/`, ob)
      .toPromise();
      let resultado = JSON.parse(result);
      if(resultado.status === 'token'){
        localStorage.setItem('token', resultado.token);
        this.router.navigate(['/login']);
      }
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
