import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  public ShowError(msg: any) {
    Swal.fire({
      title: 'Atenção',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Fechar',
    });
  }

  public success(msg: any) {
    Swal.fire({
      title: 'Sucesso',
      text: msg,
      icon: 'success',
      confirmButtonText: 'Fechar',
    });
  }

  public async interrogationWithInput(msg: any, motivo: any) {
    let retorno = {};

  await Swal.fire({
      title: 'Atenção',
      html: msg,
      icon: 'warning',
      input: 'text',
      inputLabel: motivo,
      inputPlaceholder: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim',
    }).then((result) => {
      retorno = {
        status: result.isConfirmed,
        motivo: result.value,
      };
    });

    return retorno;
  }

  public async interrogation(msg: any) {
    let retorno = {};

  await Swal.fire({
      title: 'Atenção',
      html: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
    }).then((result) => {
      retorno = {
        status: result.isConfirmed,
        motivo: result.value,
      };
    });

    return retorno;
  }

  public warning() {}
}
