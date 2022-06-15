import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private alert: AlertService) {}

  sair: any;
  async logout() {
    this.sair = await this.alert.interrogation('Deseja realmente sair?');
    if (this.sair.status) {
      window.localStorage.clear();
      this.router.navigate(['']);
    } else {
      this.router.navigate(['']);
    }
  }
  ngOnInit(): void {
    this.logout();
  }
}
