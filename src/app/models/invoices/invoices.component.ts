import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';
import { LoadingService } from 'src/app/services/loading.service';
import { JqueryService } from 'src/app/services/jquery.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(private load: LoadingService, private parcelas: InvoicesService) { }

  invoices: any = [];
  totalPago: any;

  async getParcelas(){
    const parc = await this.parcelas.getInvoicesLocal();
    let parce = parc.map((obj: any) => {
      let ob = { ...obj, bill_date: new Date(obj.bill_date) };
      return ob;
    });
    //Ordenar por Data Desc
    const dSort = parce.sort(
      (objA: any, objB: any) => objB.bill_date.getTime() - objA.bill_date.getTime(),
    )
    this.invoices = dSort;

    if (dSort) {
      JqueryService.jTable('0', 'desc', [1,2,3,4]);
    }
    console.log(parc);
  }

  ngOnInit(): void {
    //this.load.show();
    this.getParcelas();
  }

}
