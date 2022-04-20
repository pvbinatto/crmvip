import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class JqueryService {
  constructor() {}

  public static jTable(coluna: any, ordem: any) {
    $(document).ready(function () {
      $('.dataTable').DataTable({
        order: [coluna, ordem],
      });
    });
    
  }

  public static closeModal() {
    $('.modal').modal('hide');
  }
}
