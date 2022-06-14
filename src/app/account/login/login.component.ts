import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  resetPass = {
    email: '',
  };

  person = {
    name: '',
    email: '',
  };

  public showError = '';
  public loginError = false;
  resetError = false;
  statusReset = '';

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  async onReset() {
    const result = await this.accountService.resetPass(this.resetPass);
    if (result) {
      this.statusReset = 'E-mail enviado com sucesso';
    } else {
      this.resetError = true;
    }
  }

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.user);
      if (result.status === 'confirmed') {
        this.person.name = result.data.name;
        this.person.email = result.data.email;
        localStorage.setItem('token', result.data.company.token);
        localStorage.setItem('business', JSON.stringify(result.data.company));
        localStorage.setItem('person', JSON.stringify(this.person));
        if (result.data.lastlogin === null) {
          const verifica = await this.accountService.verifyAccount(result.data);
          console.log(verifica);
        } else {
          this.router.navigate(['']);
        }
        this.showError = '';
        this.loginError = false;
        //redireciona para rota vazia novamente
      } else {
        this.showError = result.message;
        this.loginError = true;
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }
}
