import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/shared/account.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  business = {
    email: '',
  };

  lbEnviar = 'Reenviar E-mail';

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  async getEmpresa(token: any) {
    const result = await this.accountService.verificaToken(token);
    return result;
  }

  async enviaEmail(business: any) {
    this.lbEnviar = '<i class="fas fa-circle-notch fa-spin"></i>';
    const result = await this.accountService.enviaEmailAtivacao(business);
    if (result.status === 'success') {
      this.lbEnviar = 'Reenviar E-mail';
    }
  }

  public enviar() {
    this.spinner.show();
    let token = this.route.snapshot.paramMap.get('id');
    this.getEmpresa(token).then((data) => {
      this.business.email = data.email;
      this.enviaEmail(data).then((retorno) => {
        this.spinner.hide();
      });
    });
  }

  ngOnInit(): void {
    this.enviar();
  }
}
