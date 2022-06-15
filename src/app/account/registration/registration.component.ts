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
      this.business.password = '';
      localStorage.setItem('token', token);
      this.showCNPJ = true;
    } else {
      this.showCNPJ = true;
    }
  }

  async pesquisaCEP(cep: any) {
    let ceps = await this.accountService.pesquisaCep(cep);
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
    this.business.cpfcnpj = GlobalComponent.formataCNPJ(this.business.cpfcnpj);
    this.business.company = businessReceita.nome;
    this.business.companyName = businessReceita.fantasia;
    this.business.email = businessReceita.email;
    this.validaEmail(businessReceita.email);
    this.business.phone = businessReceita.telefone.substring(0, 14);
    this.business.zipcode = businessReceita.cep;
    this.business.address = businessReceita.logradouro;
    this.business.number = businessReceita.numero;
    this.business.district = businessReceita.bairro;
    this.business.complement = businessReceita.complemento;
    this.business.city = businessReceita.municipio;
    this.business.state = businessReceita.uf;
    this.temCNPJ = true;
    this.temCEP = true;
  }

  validCel = '';
  validFix = '';

  validaCelular(cel: any) {
    if (cel !== null) {
      if (cel.length > 10 && cel.length <= 14) {
        this.validCel = 'true';
      }
    }
  }

  validaTelefone(fone: any) {
    if (fone !== null) {
      if (fone.length > 10 && fone.length <= 14) {
        this.validFix = 'true';
      }
    }
  }

  validResponsavel = '';
  validaResponsavel(resp: any) {
    if (resp !== null) {
      this.validResponsavel = 'true';
    }
  }

  pass = '';
  passConf = '';
  validPass = '';
  validaSenha(pass: any) {
    if (pass !== null && pass !== '') {
      if (pass === '' || pass.length < 6 || pass.length > 8) {
        this.validPass = 'false';
        this.alert.ShowError('Verifique sua senha');
      } else {
        this.validPass = 'true';
      }
    }
  }

  validaSenhaPass() {
    if (
      this.business.passwordConfirm !== '' &&
      this.business.passwordConfirm !== null &&
      this.business.passwordConfirm !== undefined
    ) {
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
    if (cpf !== null) {
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
    if (this.business.person === null) {
      this.validResponsavel = 'false';
      valid = false;
    }
    if (!valid) {
      return false;
    }
    return true;
  }

  async continuar(tela: any) {
    this.tela1 = false;
    this.tela2 = false;
    this.tela3 = false;
    if (this.verificaErrors()) {
      if (tela === 1) {
        this.tela1 = true;
      } else if (tela === 2) {
        this.tela2 = true;
      } else if (tela === 3) {
        if (this.business.codigoInterno == null) {
          this.tela3 = true;
        } else {
          let user = {
            company_id: parseInt(this.business.id),
            name: this.business.person,
            email: this.business.email,
            password: this.business.password,
            phone: this.business.cellphone,
          };
          let userCreate = await this.accountService.createUser(user);
          let atualizaBusiness = await this.accountService.createAccount(this.business);
          if (userCreate.id !== null) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      } else if (tela === 4) {
        this.tela4 = true;
      } else if (tela === 5) {
        this.tela5 = true;
      }
    } else {
      this.tela1 = true;
      this.alert.ShowError('Verifique todos os campos obrigatórios');
    }
  }

  dados: any;
  ngOnInit(): void {
    this.getBusiness();
    this.dados = localStorage.getItem('dados');
    this.business = JSON.parse(this.dados);
    this.business.email.toLowerCase();
    this.validaEmail(this.business.email);
    if (this.business.phone !== null) {
      this.validaTelefone(this.business.phone);
    }
    //this.pesquisa(this.business.cpfcnpj);
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
      const emp = await this.accountService.addNovo(ob);
      this.spinner.hide();
    }
  }
}
