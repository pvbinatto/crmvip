import { Component, OnInit } from '@angular/core';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';

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

  constructor() { }

  getInitials(str: any){
    let name = str.split(' ');
    return name[0].charAt(0) + "" + name[1].charAt(0);
  }

  ngOnInit(): void {
    this.personlocal = localStorage.getItem('person');
    this.person = JSON.parse(this.personlocal);
    this.namePerson = this.person.name;
    this.initials = this.getInitials(this.namePerson);
  }

}
