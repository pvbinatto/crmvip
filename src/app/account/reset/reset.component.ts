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

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  async getUserByHash() {
    this.spinner.show();
    let hash = this.route.snapshot.paramMap.get('id');
    this.user = await await this.accountService.verificaHashUser(hash);
    this.user.password = '';
    console.log(this.user);
    this.spinner.hide();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.router.navigate(['/']);
  }
}
