import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class JqueryService {
  constructor() {}

  public static jTable(coluna: any, ordem: any, targets: any) {
    $(document).ready(function () {
      $('.dataTable').DataTable({
        "columnDefs": [ {
          "targets"  : targets,
          "orderable": false,
          "order": ordem
        }]
      });
    });
  }

  public static closeModal() {
    $('.modal').modal('hide');
  }
}
