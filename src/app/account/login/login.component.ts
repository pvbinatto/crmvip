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
    senha: '',
  };

  public showError = '';
  public loginError = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}
  
  async onSubmit() {
    try {
      const result = await this.accountService.login(this.user);
      if (result === 'confirmed') {
        this.showError = "";
        this.loginError = false;
        //redireciona para rota vazia novamente
        this.router.navigate(['']);
      } else {
        this.showError = result.message;
        this.loginError = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
