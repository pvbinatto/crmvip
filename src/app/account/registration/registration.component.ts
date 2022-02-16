import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/shared/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  enableData = 'disabled';

  business = {
    id: '',
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
    state: '',
    country: '',
    token: '',
    codigoInterno: '',
    password: '',
    passwordConfirm: '',
  };
  status = true;
  showError = '';

  user = {
    company_id: '',
    team_id: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  };

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  async getBusiness() {
    let token = this.route.snapshot.paramMap.get('id');
    this.business = await await this.accountService.verificaToken(token);
    this.business.password = '';
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

  validatePass(user: any) {
    this.status = true;
    this.showError = '';
    if (user.password.length <= 5) {
      this.status = false;
      this.showError = 'A senha deve conter entre 6 e 12 caracteres';
      return false;
    } else if (user.password !== user.passwordConfirm) {
      this.status = false;
      this.showError = 'As senhas são diferentes';
      return false;
    }
    this.spinner.hide();
    return true;
  }

  ngOnInit(): void {
    this.getBusiness();
  }

  async onSubmit() {
    this.spinner.show();
    if (this.validate(this.business, this.user) && this.validatePass(this.user)) {
      const retorno = await this.accountService.createAccount(this.business);
      if (retorno) {

        localStorage.setItem('token', this.business.token);
        localStorage.setItem('business', JSON.stringify(retorno));

        this.user.company_id = retorno.id;
        this.user.email = this.business.email;
        this.user.password = this.user.password;
        this.user.phone = this.business.phone;
        this.user.team_id = '';
        const createUs = await this.accountService.createUser(this.user);
        this.router.navigate(['/']);
        this.spinner.hide();
      }
    }
  }
}
