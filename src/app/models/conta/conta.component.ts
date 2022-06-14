import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  constructor() { }

  @Input() data: any;

  ngOnInit(): void {

    console.log(this.data);
  }

  onSubmit(){

  }

}
