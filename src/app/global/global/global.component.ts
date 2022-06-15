import { splitAtColon } from '@angular/compiler/src/util';
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
    /[0-9]/,
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

  public static formataCNPJ(cnpj: any) {
    return cnpj
      .toString()
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  public static validarCNPJ(cnpj: any) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

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

  public static capitalize(str: any) {
    var words = str.split(' ');
    var newStr = '';
    for (let i = 0; i < words.length; i++) {
      const wp = words[i];
      newStr += wp.charAt(0).toUpperCase() + wp.slice(1).toLowerCase() + ' ';
    }
    return newStr.slice(0, -1);
  }

  public static lower(str: any) {
    return str.toLowerCase();
  }

  public static upper(str: any) {
    return str.toUpperCase();
  }

  public static getEmpresa() {
    let empresa: any;
    empresa = localStorage.getItem('business');
    const business = JSON.parse(empresa);
    business.address = this.capitalize(business.address);
    business.district = this.capitalize(business.district);
    business.city = this.capitalize(business.city);
    business.email = this.lower(business.email);
    return business;
  }

  public static getPerson() {
    let person: any;
    person = localStorage.getItem('person');
    const business = JSON.parse(person);
    return business;
  }
}
