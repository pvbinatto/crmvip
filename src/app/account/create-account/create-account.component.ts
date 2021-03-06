import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalComponent } from 'src/app/global/global/global.component';
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
    cpfcnpj: '',
  };

  mask = GlobalComponent.maskCNPJ;

  business: any;

  public showError = '';
  public loginError = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

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
    if (ob.cnpj === '') {
      this.mensagemErro('Verifique os dados que estão faltando');
      return false;
    } else if (!GlobalComponent.validarCNPJ(ob.cpfcnpj)) {
      this.mensagemErro('Verifique o seu CNPJ');
      return false;
    }
    return true;
  }

  dados = false;
  async onSubmit() {
    try {
      if (this.validaDados(this.user)) {
        const result = await this.accountService.verifyAccount(this.user);
        
        if (result === null) {
          //Ainda nao tem cadastro no VIP
          console.log('não tem cadastro no vip');
        } else {
          //Se tiver cadastro no VIP
          try {
            this.business = result;
            const insertCad = await this.accountService.createAccount(
              this.business
            );
            let localBusiness = JSON.stringify(insertCad);
            localStorage.setItem('dados', localBusiness);
            this.router.navigate(['/registration', {id: insertCad.token}]);
          } catch (error: any) {
            console.error(error.error);
          }
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}
