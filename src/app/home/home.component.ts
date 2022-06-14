import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from '../global/global/global.component';
import { ContratoService } from '../services/contrato.service';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  business: any;
  strLocal: any;
  razaosocial: any;
  servicos: any;
  atendimentos: any;
  faturas: any;

  tickets = [
    {
      id: 1515454,
      departamento: 'Suporte',
      status: 'Fechado',
      atualizacao: '03/02/2022 (19:25)',
    },
  ];

  parcelas = [
    {
      id: '',
      document: '',
      created: '',
      bill_date: '',
      price: '',
      pay: '',
      cancelled: ''
    },
  ];

  servicos_contratados: any;
  status_servico: any;
  valorTotal: any;

  constructor(
    private contratoService: ContratoService,
    private invoice: InvoicesService
  ) {}

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.servicos_contratados.length; i++) {
      if (this.servicos_contratados[i].cancelado === 'N') {
        sum += parseFloat(this.servicos_contratados[i].valor);
      }
    }
    return sum;
  }

  async contratos() {
    this.servicos = GlobalComponent.carregando;
    this.atendimentos = 34;
    const contratos = await this.contratoService.verificaContratos(
      GlobalComponent.getEmpresa().codigoInterno
    );
    let total = 0;
    for (let i = 0; i < contratos.length; i++) {
      const at = contratos[i];
      if (at.cancelado === 'N') {
        total++;
      }
    }
    this.servicos = total;
    this.servicos_contratados = contratos;
    this.valorTotal = this.getSum();
  }

  async invoices() {
    const faturas = await this.invoice.getInvoicesLocal();
    
    if (faturas !== null) {
      this.faturas = faturas.length;
      //Mapear a data e mudar para new Date
      let parce = faturas.map((obj: any) => {
        let ob = { ...obj, bill_date: new Date(obj.bill_date) };
        return ob;
      });
      //Ordenar por Data Desc
      const dSort = parce.sort(
        (objA: any, objB: any) => objB.bill_date.getTime() - objA.bill_date.getTime(),
      )
      this.parcelas = dSort;
    } else {
      this.faturas = 0;
      this.parcelas = [];
    }
  }

  ngOnInit(): void {
    this.razaosocial = GlobalComponent.getEmpresa().company.toLowerCase();
    this.contratos();
    this.invoices();
  }
}
