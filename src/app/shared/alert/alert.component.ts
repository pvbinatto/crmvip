import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor() {}

  error(msg: any) {
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Cool',
    });
  }

  ngOnInit(): void {}
}
