import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from '../global/global/global.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  time = GlobalComponent.ano;

  ngOnInit(): void {

    
  }

}
