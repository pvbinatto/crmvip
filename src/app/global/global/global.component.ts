import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent {
  
  constructor() {}

  business: any;

  public static datas = new Date();
  public static data = GlobalComponent.datas.toJSON().split('T')[0];
  public static ano = GlobalComponent.datas.getFullYear();
  public static hora =
    GlobalComponent.datas.getHours() +
    ':' +
    GlobalComponent.datas.getMinutes() +
    ':' +
    GlobalComponent.datas.getSeconds();

  public static data_hora = GlobalComponent.data + ' ' + GlobalComponent.hora;
  public static data_hora_br = GlobalComponent.data.split('-').reverse().join('/') + ' ' + GlobalComponent.hora;
  public static carregando = '<i class="fas fa-circle-notch fa-spin"></i>';

  public static getEmpresa(){
    let empresa: any;
    empresa = localStorage.getItem('business');
    const business = JSON.parse(empresa);
    return business;
  }

}
