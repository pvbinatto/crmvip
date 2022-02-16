import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/shared/account.service';

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
  },{
    id: 1515454,
    departamento: 'Suporte',
    status: 'Fechado',
    atualizacao: '03/02/2022 (19:25)'
  },{
    id: 1515454,
    departamento: 'Suporte',
    status: 'Fechado',
    atualizacao: '03/02/2022 (19:25)'
  },{
    id: 1515454,
    departamento: 'Suporte',
    status: 'Aberto',
    atualizacao: '03/02/2022 (19:25)'
  },]

  parcelas = [{
    id: 138598,
    emissao: '05/02/2022',
    vencimento: '10/02/2022',
    total: 'R$ 548,90',
    status: 'PAGA'
  },{
    id: 138598,
    emissao: '05/02/2022',
    vencimento: '10/02/2022',
    total: 'R$ 548,90',
    status: 'PAGA'
  },{
    id: 138598,
    emissao: '05/02/2022',
    vencimento: '10/02/2022',
    total: 'R$ 548,90',
    status: 'PAGA'
  },{
    id: 138598,
    emissao: '05/02/2022',
    vencimento: '10/02/2022',
    total: 'R$ 548,90',
    status: 'PAGA'
  }]


  constructor(
    private accountService: AccountService,
  ) {}

  async contratos(){
    this.servicos = '?';
    this.atendimentos = 34;
    this.faturas = 1;
    const contratos = await this.accountService.verificaContratos(this.business.codigoInterno);
    this.servicos = contratos.itens.length;
  }

  ngOnInit(): void {
    this.strLocal = localStorage.getItem('business');
    this.business = JSON.parse(this.strLocal);
    this.razaosocial = this.business.company.toLowerCase();

    this.contratos();

  }

}
