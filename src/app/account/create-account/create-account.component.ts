import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    senha: '',
    confirme: '',
  };

  public showError = '';
  public loginError = false;

  constructor(private accountService: AccountService, private router: Router) {}

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

  public validaDados(ob: any) {
    if (ob.nome === '' || ob.email === '' || ob.senha === '') {
      this.mensagemErro('Verifique os dados que estão faltando');
      return false;
    }
    return true;
  }

  async onSubmit() {
    try {
      if (this.user.senha !== this.user.confirme) {
        this.mensagemErro('As senhas não são iguais!');
      } else {
        if (this.validaDados(this.user)) {
          const result = await this.accountService.createAccount(this.user);
          console.log(result);
          if (result.status === 'error') {
            this.mensagemErro(result.message);
          } else {
            window.localStorage.setItem('token', result.token);
            this.clearObject(this.user);
            this.mensagemErro('');
            window.location.href = '/';
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
