import { Component, OnInit, EventEmitter } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { contratoItemService } from 'src/app/services/contratoitem.sevice';
import { LoadingService } from 'src/app/services/loading.service';
import { ProdutoService } from 'src/app/services/produto.service';

declare var $: any;

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
  providers: [],
})
export class ContratoComponent implements OnInit {
  constructor(
    private contratoService: ContratoService,
    private produtoService: ProdutoService,
    private contratoItemService: contratoItemService,
    private spinner: LoadingService
  ) {}

  servicos: any;
  itens_contratados: any;
  business: any;
  loaded: Boolean = false;
  showItem: Boolean = false;
  showAdd: Boolean = false;
  totalContrato: any;
  contrato: any;

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.itens_contratados.length; i++) {
      if (this.itens_contratados[i].cancelado === 'N') {
        sum += parseFloat(this.itens_contratados[i].valor);
      }
    }
    return sum;
  }

  public async contratos(type: any) {
    this.spinner.show();
    this.business = localStorage.getItem('business');
    this.business = JSON.parse(this.business);
    const contratos = await this.contratoService.verificaContratos(
      this.business.codigoInterno
    );
    this.spinner.hide();
    this.itens_contratados = contratos;
    this.totalContrato = this.getSum();
    if (contratos.length > 0) {
      this.contrato = contratos[0].contrato.CODIGO;
    }

    if (contratos && type === '') {
      $(document).ready(function () {
        $('#dataTable').DataTable({
          columnDefs: [
            {
              targets: [3],
              searchable: false,
              orderable: false,
              visible: true,
            },
          ],
        });
      });
    }
  }

  public detalhes(item: any): void {
    this.contratoService.setContratoItem(item);
    this.showItem = true;
    this.showAdd = false;
  }

  async getProdutos() {
    const produtosGet = await this.produtoService.getProdutosWs();
    this.produtoService.emitirProdutos.emit(produtosGet);
    ProdutoService.enviouProdutos.emit(produtosGet);
    return produtosGet;
  }

  public addContratoVoid(): void {
    this.getProdutos();
    this.contratoItemService.setContratoItem(this.itens_contratados);
    this.showAdd = true;
    this.showItem = false;
  }

  ngOnInit(): void {
    this.contratos('');
  }

  ngAfterViewInit() {}
}
