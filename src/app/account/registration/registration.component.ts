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

  validate(business: any) {
    this.status = true;
    this.showError = '';
    if (
      business.email === '' ||
      business.phone === '' ||
      business.cellphone === '' ||
      business.password === '' || business.password === null
    ) {
      this.status = false;
      this.showError = 'Verifique as informações necessárias';
      return false;
    }
    this.spinner.hide();
    return true;
  }

  validatePass(business: any) {
    this.status = true;
    this.showError = '';
    if (business.password.length <= 5) {
      this.status = false;
      this.showError = 'A senha deve conter entre 6 e 12 caracteres';
      return false;
    } else if (business.password !== business.passwordConfirm) {
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
    if (this.validate(this.business) && this.validatePass(this.business)) {
      
      const retorno = await this.accountService.createAccount(this.business);
      if (retorno) {
        localStorage.setItem('token', this.business.token);
        localStorage.setItem('business', JSON.stringify(retorno));
        this.router.navigate(['/']);
        this.spinner.hide();
      }
    }
  }
}
