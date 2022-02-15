import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRMVIP :: Atendimento';
  titleS = 'spinner';
  spinnerType:any;
  spinnerName: any;


  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {

  }
}
