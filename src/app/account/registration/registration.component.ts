import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalComponent } from 'src/app/global/global/global.component';
import { AlertService } from 'src/app/services/alert.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { AccountService } from 'src/app/services/shared/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private renderer2: Renderer2,
    private produtoService: ProdutoService
  ) {}

  enableData = 'disabled';
  showCNPJ = false;
  mask = GlobalComponent.maskCNPJ;
  cpf = GlobalComponent.maskCPF;
  cep = GlobalComponent.maskCEP;
  temCNPJ = false;
  temCEP = false;
  status = true;
  showError = '';
  contrato: any;
  tela1 = true;
  tela2 = false;
  tela3 = false;
  tela4 = false;
  tela5 = false;

  business = {
    id: '',
    company: '',
    companyName: '',
    cpfcnpj: '',
    email: '',
    phone: '',
    cellphone: '',
    zipcode: '',
    address: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    country: '',
    token: '',
    codigoInterno: '',
    password: '',
    passwordConfirm: '',
    person: '',
    personDocument: '',
  };

  contratoCliente = {
    diaPagamento: 10,
  };

  user = {
    company_id: '',
    team_id: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  };

  async getBusiness() {
    let token = this.route.snapshot.paramMap.get('id');
    if (token !== null) {
      this.business = await await this.accountService.verificaToken(token);
      console.log(this.business);
      this.business.password = '';
    } else {
      this.showCNPJ = true;
    }
  }

  async pesquisaCEP(cep: any) {
    let ceps = await this.accountService.pesquisaCep(cep);
    console.log(ceps);
    this.business.address = ceps.logradouro;
    this.business.district = ceps.bairro;
    this.business.complement = ceps.complemento;
    this.business.city = ceps.localidade;
    this.business.state = ceps.uf;
    this.business.number = '';
    this.renderer2.selectRootElement('#number').focus();
  }

  async pesquisa(cnpj: any) {
    let businessReceita = await this.accountService.consultaCnpjReceita(cnpj);
    console.log(businessReceita);
    // this.business.company = businessReceita.nome;
    // this.business.companyName = businessReceita.fantasia;
    // this.business.person = businessReceita.qsa[0].nome;
    // this.business.email = businessReceita.email;
    // this.validaEmail(businessReceita.email);
    // this.business.phone = businessReceita.telefone;
    // this.business.zipcode = businessReceita.cep;
    // this.business.address = businessReceita.logradouro;
    // this.business.number = businessReceita.numero;
    // this.business.district = businessReceita.bairro;
    // this.business.complement = businessReceita.complemento;
    // this.business.city = businessReceita.municipio;
    // this.business.state = businessReceita.uf;
    // this.temCNPJ = true;
    // this.temCEP = true;
    //Remover apos os testes
    // this.business.personDocument = '351.140.858-08';
    // this.validaCPF(this.business.personDocument);
    // this.business.cellphone = '(18)99702-8873';
    // this.validaTelefone(this.business.cellphone);
    // this.business.password = '123456';
    // this.business.passwordConfirm = '123456';
    // this.validaSenha(this.business.password);
    // this.validaSenhaPass();
  }

  validCel = '';
  validFix = '';
  validaTelefone(cel: any) {
    if (cel.length > 10 && cel.length <= 14) {
      this.validCel = 'true';
    }
  }

  pass = '';
  passConf = '';
  validPass = '';
  validaSenha(pass: any) {
    if (pass === '' || pass.length < 6 || pass.length > 8) {
      this.validPass = 'false';
      this.alert.ShowError('Verifique sua senha');
    } else {
      this.validPass = 'true';
    }
  }

  validaSenhaPass() {
    if (this.business.passwordConfirm !== '') {
      if (this.business.password !== this.business.passwordConfirm) {
        this.passConf = 'false';
        this.alert.ShowError('As senhas não conferem');
      } else {
        this.passConf = 'true';
        this.validPass = 'true';
      }
    }
  }

  validEmail = '';
  validaEmail(email: any) {
    if (email !== '') {
      if (!GlobalComponent.validateEmail(email)) {
        this.validEmail = 'false';
      } else {
        this.validEmail = 'true';
      }
    }
  }

  validCPF = '';
  validaCPF(cpf: any) {
    if (cpf.length > 0) {
      if (!GlobalComponent.validarCPF(cpf)) {
        this.validCPF = 'false';
        this.alert.ShowError('Verifique seu CPF');
      } else {
        this.validCPF = 'true';
      }
    }
  }

  verificaErrors() {
    let valid = true;
    if (this.validCPF !== 'true') {
      this.validCPF = 'false';
      valid = false;
    }
    if (this.validCel !== 'true') {
      this.validCel = 'false';
      valid = false;
    }
    if (this.validEmail !== 'true') {
      this.validEmail = 'false';
      valid = false;
    }
    if (this.validPass !== 'true') {
      this.validPass = 'false';
      valid = false;
    }
    if (this.passConf !== 'true') {
      this.passConf = 'false';
      valid = false;
    }
    if (!valid) {
      return false;
    }
    return true;
  }
  continuar(tela: any) {
    this.tela1 = false;
    this.tela2 = false;
    this.tela3 = false;
    if (this.verificaErrors()) {
      if (tela === 1) {
        this.tela1 = true;
      } else if (tela === 2) {
        this.tela2 = true;
      } else if (tela === 3) {
        this.tela3 = true;
      } else if (tela === 4) {
        this.tela4 = true;
      } else if (tela === 5) {
        this.tela5 = true;
      }
    } else {
      this.alert.ShowError('Verifique todos os campos obrigatórios');
    }
  }

  validate(business: any, user: any) {
    this.status = true;
    this.showError = '';
    if (
      business.email === '' ||
      business.phone === '' ||
      business.cellphone === '' ||
      user.password === '' ||
      user.password === null ||
      user.name === '' ||
      user.name === null
    ) {
      this.status = false;
      this.showError = 'Verifique as informações necessárias';
      this.spinner.hide();
      return false;
    }
    this.spinner.hide();
    return true;
  }

  cnpjs: any;
  ngOnInit(): void {
    this.getBusiness();
    this.cnpjs = localStorage.getItem('cnpj');
    this.business.cpfcnpj = JSON.parse(this.cnpjs);
    this.pesquisa(this.business.cpfcnpj);
    localStorage.removeItem('cart');
  }
  cart: any;
  termos = true;
  async onSubmit() {
    this.spinner.show();
    this.cart = localStorage.getItem('cart');
    if (this.cart === null) {
      this.spinner.hide();
      this.alert.ShowError('Adicione produtos ao seu contrato');
    } else if (localStorage.getItem('confirmo') === null) {
      this.spinner.hide();
      this.termos = false;
      this.alert.ShowError('Você precisa aceitar os termos para continuar');
    } else {
      this.termos = true;
      let ob = {
        data: {
          empresa: this.business,
          contrato: this.contratoCliente,
          products: JSON.parse(this.cart),
        },
      };
      console.log(ob);
      this.spinner.hide();
    }
  }
}
