import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  };
  status = true;
  showError = '';

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {}

  async getBusiness() {
    let token = this.route.snapshot.paramMap.get('id');
    this.business = await await this.accountService.verificaToken(token);
  }

  ngOnInit(): void {
    this.getBusiness();
  }

  onSubmit() {
    this.router.navigate(['account/registration/ower']);
  }
}
