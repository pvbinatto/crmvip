import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent {
  constructor() {}

  business: any;

  public static validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email.trim());
  }

  public static maskCEP = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ];

  public static maskCNPJ = [
    /[1-9]/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  public static maskCPF = [
    /[1-9]/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  public CNPJ() {}

  public static validarCPF(cpf: any) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }

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
  public static data_hora_br =
    GlobalComponent.data.split('-').reverse().join('/') +
    ' ' +
    GlobalComponent.hora;
  public static carregando = '<i class="fas fa-circle-notch fa-spin"></i>';

  public static getEmpresa() {
    let empresa: any;
    empresa = localStorage.getItem('business');
    const business = JSON.parse(empresa);
    return business;
  }
}
