import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from 'src/app/global/global/global.component';
import { AlertService } from 'src/app/services/alert.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { contratoItemService } from 'src/app/services/contratoitem.sevice';
import { LoadingService } from 'src/app/services/loading.service';
import { ContratoComponent } from '../contrato.component';

declare var $: any;

@Component({
  selector: 'app-contratoitem',
  templateUrl: './contratoitem.component.html',
  styleUrls: ['./contratoitem.component.css'],
})
export class ContratoitemComponent implements OnInit {
  product: any;
  btnCancel = false;
  confirm: any;
  public idproduto: any;
  retorno: any;

  constructor(
    private service: ContratoService,
    private alert: AlertService,
    private contratoItemService: contratoItemService,
    private contratoComponent: ContratoComponent,
    private loading: LoadingService
  ) {}

  async habilitaCancel(product: any) {
    var msg =
      'Ao solicitar o cancelamento, nosso time de suporte vai verificar o status do produto e caso esteja em condições, realizaremos o cancelamento do mesmo. <b>O prazo é de 48 horas</b>.';
    this.confirm = await this.alert.interrogationWithInput(
      msg,
      'Informe o motivo do cancelamento'
    );
    if (this.confirm.status) {
      product.cancelado = 'S';
      product.causaCancelado = this.confirm.motivo;
      product.dataCancelado = GlobalComponent.data_hora;
      var ob = {
        produto: product,
        motivo: this.confirm.motivo,
      };
      this.retorno = await this.contratoItemService.removeItemContrato(ob);
      if (this.retorno) {
        this.loading.hide();
        this.contratoComponent.contratos('itens');
        $(document).ready(function () {
          $('#exampleModal').modal('hide');
        });
        this.alert.success(
          'Item removido com sucesso! <br>Aguarde confirmação no seu e-mail'
        );
      }
    }
  }

  async reativarItem(product: any) {
    this.confirm = await this.alert.interrogation(
      'Deseja realmente reativar este item?'
    );
    if (this.confirm.status) {
      product.cancelado = 'N';
      product.dataCancelado = null;
      product.causaCancelado = null;
      product.observacao = "Produto reativado em " + GlobalComponent.data_hora_br;
      var ob = {
        produto: product,
        motivo: this.confirm.motivo,
      };
      this.retorno = await this.contratoItemService.removeItemContrato(ob);
      this.loading.hide();
      if (this.retorno) {
        this.contratoComponent.contratos('itens');
        $(document).ready(function () {
          $('#exampleModal').modal('hide');
        });
        this.alert.success(
          'Item reativado com sucesso! \nAguarde confirmação no seu e-mail'
        );
      }
    }
  }

  ngOnInit(): void {
    this.product = this.service.getContratoItem();
    ContratoService.clicouContrato.subscribe((contrato) => {
      this.product = contrato;
    });
    this.idproduto = this.product.CODIGO;
  }
}
