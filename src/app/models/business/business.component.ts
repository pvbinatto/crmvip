import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalComponent } from 'src/app/global/global/global.component';
import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from 'src/app/services/shared/account.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessComponent implements OnInit {
  constructor(
    private account: AccountService,
    private alert: AlertService,
    private loading: NgxSpinnerService
  ) {}

  business: any;
  emp: any;
  person: any;
  mask = GlobalComponent.maskCNPJ;
  cpf = GlobalComponent.maskCPF;
  cep = GlobalComponent.maskCEP;

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
    console.log(pass);
    if (pass !== null && pass !== '') {
      if (pass === '' || pass.length < 6 || pass.length > 8) {
        this.validPass = 'false';
        this.alert.ShowError('Verifique sua senha');
      } else {
        this.validPass = 'true';
      }
    }
  }

  validaSenhaPass(pass: any) {
    console.log(pass)
    if (
      pass !== '' &&
      pass !== null &&
      pass !== undefined
    ) {
      if (this.person.password !== pass) {
        this.passConf = 'false';
        this.alert.ShowError('As senhas não conferem');
      } else {
        this.passConf = 'true';
      }
    } else {
      this.passConf = 'false';
      this.alert.ShowError('As senhas não conferem');
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
    if (this.validCel !== 'true') {
      this.validCel = 'false';
      valid = false;
    }
    if (this.validFix !== 'true') {
      this.validFix = 'false';
      valid = false;
    }
    if (this.validEmail !== 'true') {
      this.validEmail = 'false';
      valid = false;
    }
    if (!this.validaEndereco(this.emp)) {
      valid = false;
    }
    if (!valid) {
      return false;
    } else {
      return true;
    }
  }
  Validaddress = '';
  Validnumber = '';
  Validdistrict = '';
  Validcity = '';
  Validstate = '';
  Validzipcode = '';

  validaEndereco(end: any) {
    let validEnd = true;
    if (end.address === '') {
      this.Validaddress = 'false';
      validEnd = false;
    } else {
      this.Validaddress = 'true';
    }
    if (end.number == '') {
      this.Validnumber = 'false';
      validEnd = false;
    } else {
      this.Validnumber = 'true';
    }
    if (end.district == '') {
      this.Validdistrict = 'false';
      validEnd = false;
    } else {
      this.Validdistrict = 'true';
    }
    if (end.city == '') {
      this.Validcity = 'false';
      validEnd = false;
    } else {
      this.Validcity = 'true';
    }
    if (end.state == '') {
      this.Validstate = 'false';
      validEnd = false;
    } else {
      this.Validstate = 'true';
    }
    if (end.zipcode == '') {
      this.Validzipcode = 'false';
      validEnd = false;
    } else {
      this.Validzipcode = 'true';
    }
    if (!validEnd) {
      return false;
    }
    return true;
  }
  async pesquisaCep(ceps: any) {
    if (ceps === '') {
      this.alert.ShowError('Verifique o CEP informado');
    } else {
      if (ceps.replace(/\D+/g, '').length !== 8) {
        this.alert.ShowError('Verifique o CEP informado');
      } else {
        try {
          this.loading.show();
          let cep = await this.account.pesquisaCep(ceps);
          if (!cep.erro) {
            this.loading.hide();
            this.emp.address = cep.logradouro;
            this.emp.district = cep.bairro;
            this.emp.city = cep.localidade;
            this.emp.state = cep.uf;
            this.validaEndereco(this.emp);
          } else {
            this.loading.hide();
            this.alert.ShowError('CEP Inválido');
          }
        } catch (error: any) {
          this.loading.hide();
          console.error(error);
        }
      }
    }
  }

  ngOnInit(): void {
    this.emp = GlobalComponent.getEmpresa();
    this.person = GlobalComponent.getPerson();
    this.person.password = '';
    this.person.passwordAntigo = '';
    this.person.passwordConfirm = '';
  }

  async submitPass(){
    console.log(this.person.password);
    this.validaSenha(this.person.password);
    this.validaSenhaPass(this.person.passwordConfirm);
    console.log(this.person);
  }

  async onSubmit() {
    this.validaEmail(this.emp.email);
    this.validaCPF(this.emp.personDocument);
    this.validaCelular(this.emp.cellphone);
    this.validaTelefone(this.emp.phone);
    this.validaResponsavel(this.emp.person);

    if (!this.verificaErrors()) {
      this.alert.ShowError('Verifique os dados do formulário');
    } else {
      this.loading.show();
      let update = await this.account.createAccount(this.emp);
      if (update) {
        this.loading.hide();
        this.alert.success('Dados atualizados com sucesso');
      }
    }
  }
}
