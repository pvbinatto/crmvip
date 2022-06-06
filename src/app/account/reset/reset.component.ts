import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/shared/account.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  user = {
    company_id: '',
    team_id: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  };

  status = true;
  showError = '';
  loginError = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  valida(user: any) {
    if (user.password === '' || user.passwordConfirm === '') {
      this.showError = 'Verifique suas senhas';
      this.status = false;
      this.loginError = false;
      return false;
    } else if (user.password !== user.passwordConfirm) {
      this.showError = 'As senhas não são iguais';
      this.status = false;
      this.loginError = false;
      return false;
    }
    this.status = true;
    this.showError = '';
    this.loginError = false;
    return true;
  }

  async getUserByHash() {
    this.spinner.show();
    let hash = this.route.snapshot.paramMap.get('id');
    this.user = await await this.accountService.verificaHashUser(hash);
    this.user.password = '';
    this.spinner.hide();
  }

  ngOnInit(): void {
    this.getUserByHash();
  }

  async onSubmit() {
    if (this.valida(this.user)) {
      const result = await this.accountService.updatePassword(this.user);
      localStorage.setItem('token', result.company.token);
      localStorage.setItem('business', JSON.stringify(result.company));
      this.router.navigate(['/']);
    }
  }
}
