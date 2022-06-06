import { sanitizeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { AlertService } from '../services/alert.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  personlocal: any;
  person: any;
  namePerson: any;
  initials: any;

  constructor(private alert: AlertService, private router: Router) { }

  getInitials(str: any){
    let name = str.split(' ');
    return name[0].charAt(0) + "" + name[1].charAt(0);
  }
  sair: any;
  async logout(){
      this.sair  = await this.alert.interrogation('Deseja realmente sair?');
      if(this.sair.status){
        this.router.navigate(['logout']);
      }
  }

  ngOnInit(): void {
    this.personlocal = localStorage.getItem('person');
    this.person = JSON.parse(this.personlocal);
    this.namePerson = this.person.name;
    this.initials = this.getInitials(this.namePerson);
  }

}
