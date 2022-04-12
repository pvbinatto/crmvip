import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../services/contrato.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  business: any;
  strLocal: any;
  razaosocial: any;
  servicos: any;
  atendimentos: any;
  faturas: any;

  tickets = [{
    id: 1515454,
    departamento: 'Suporte',
    status: 'Fechado',
    atualizacao: '03/02/2022 (19:25)'
  }]

  parcelas = [{
    id: 138598,
    emissao: '05/02/2022',
    vencimento: '10/02/2022',
    total: 'R$ 548,90',
    status: 'PAGA'
  }]

  servicos_contratados: any;
  status_servico: any;
  valorTotal: any;


  constructor(
    private contratoService: ContratoService
  ) {}

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.servicos_contratados.length; i++) {
      sum += parseFloat(this.servicos_contratados[i].valor);
    }
    return sum;
  }

  async contratos(){
    this.servicos = '?';
    this.atendimentos = 34;
    this.faturas = 1;
    const contratos = await this.contratoService.verificaContratos(this.business.codigoInterno);
    console.log(contratos);
    this.servicos = contratos.length;
    this.servicos_contratados = contratos;
    this.valorTotal = this.getSum();

  }

  ngOnInit(): void {
    this.strLocal = localStorage.getItem('business');
    this.business = JSON.parse(this.strLocal);
    this.razaosocial = this.business.company.toLowerCase();

    this.contratos();

  }

}
