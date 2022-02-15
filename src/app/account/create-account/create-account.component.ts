
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/shared/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  user = {
    nome: '',
    email: '',
    cnpj: '',
  };

  business = {
    company: '',
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
    state: ''
  };

  public showError = '';
  public loginError = false;

  constructor(private accountService: AccountService, private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  public clearObject(ob: any) {
    for (var key in ob) {
      delete ob[key];
    }
    this.mensagemErro('');
  }

  public mensagemErro(str: any) {
    if (str !== '') {
      this.showError = str;
      this.loginError = true;
    } else {
      this.showError = '';
      this.loginError = false;
    }
  }

  public mask = [
    /[1-9]/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  public validaDados(ob: any) {
    if (ob.cnpj === '') {
      this.mensagemErro('Verifique os dados que estão faltando');
      return false;
    }
    return true;
  }

  async onSubmit() {
    try {
      this.spinner.show();
      console.log('foi')
      if (this.validaDados(this.user)) {
        const result = await this.accountService.verifyAccount(this.user);
        if (result.status === 'error') {
          this.mensagemErro(result.message);
          this.spinner.hide();
        } else {
          var business = result;
          const insertCad = await this.accountService.createAccount(business);
          //window.localStorage.setItem('token', result.token);
          this.clearObject(this.user);
          this.mensagemErro('');
          this.router.navigate(['/password', {id: insertCad.token}]);
          this.spinner.hide();
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      console.error(error);
    }
  }
}
