import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { contratoItemService } from 'src/app/services/contratoitem.sevice';
import { LoadingService } from 'src/app/services/loading.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { ContratoComponent } from '../contrato.component';
declare var $: any;

@Component({
  selector: 'app-contratoadd',
  templateUrl: './contratoadd.component.html',
  styleUrls: ['./contratoadd.component.css'],
})
export class ContratoaddComponent implements OnInit {
  hideContinuar = true;
  constructor(
    private produtoService: ProdutoService,
    private contratoItemService: contratoItemService,
    private alert: AlertService,
    private contratoComponent: ContratoComponent,
    private spinner: LoadingService,
    private route: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (this.document.location.pathname.split('/')[1] === 'registration') {
      this.hideContinuar = false;
    }
  }

  public showError = '';
  public loginError = false;
  public temProduto = false;
  confirmo = false;
  hiddenRemover = true;

  itemContrato = {
    CODIGO: '',
    observacao: '',
    valor: 0,
    contrato: '',
    produto: '',
    comissao: '',
    cancelado: 'N',
    causa_cancel: null,
    valor_inicial: 0,
  };

  produtos: any;
  business: any;
  contrato: any;
  contratoItem: any;
  category: any;
  cat: any = [];
  cart: any = [];
  itens_contrato: any = [];
  itens_disponiveis: any;
  total_cart: any;

  public async getProdutos() {
    const produtosHabilitados =
      await this.produtoService.getProdutosCategoryWs();
    this.contratoItem = produtosHabilitados;
    let ob: any;
    for (let i = 0; i < produtosHabilitados.length; i++) {
      ob = produtosHabilitados[i];
      //Pega os produtos
      for (let x = 0; x < ob.products.length; x++) {
        const ob2 = ob.products[x];
        //Pega os produtos contratados
        for (let p = 0; p < this.itens_contrato.length; p++) {
          const contratados = this.itens_contrato[p];
          if (contratados.produto.id === ob2.id) {
            //Verifica se o produto contratado est?? na lista
            ob.products.splice(
              ob.products.findIndex(
                (obj: any) => obj.id === contratados.produto.id
              ),
              1
            );
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.getProdutos();
    this.itens_contrato = this.contratoItemService.getContratoItem();
    contratoItemService.enviouContrato.subscribe((contratos) => {
      this.itens_contrato = contratos;
    });
    if (this.itens_contrato.length > 0) {
      this.contrato = this.itens_contrato[0].contrato.CODIGO;
    }

    localStorage.removeItem('confirmo');
  }
  verificaConfirmo() {
    if (!this.confirmo) {
      localStorage.setItem('confirmo', 'ok');
    } else {
      localStorage.removeItem('confirmo');
    }
  }
  verificaCart() {
    if (this.cart.length > 0) {
      this.temProduto = true;
    } else {
      this.temProduto = false;
    }
    this.viewCart();
  }

  viewCart() {
    let total = 0;
    for (let ct = 0; ct < this.cart.length; ct++) {
      const prdcart = this.cart[ct];
      total += parseFloat(prdcart.price);
    }
    this.total_cart = total;
  }

  verificaBotao(id: any, type: any) {
    if (type === 'showRemove') {
      const b = document.getElementById('pd-' + id);
      const a = document.getElementById('rem-' + id);
      a?.removeAttribute('hidden');
      b?.setAttribute('hidden', 'hidden');
    } else {
      const a = document.getElementById('pd-' + id);
      const b = document.getElementById('rem-' + id);
      a?.removeAttribute('hidden');
      b?.setAttribute('hidden', 'hidden');
    }
  }

  addCart(produto: any) {
    const first = this.cart.find((obj: any) => {
      return obj.id === produto.id;
    });
    if (first === undefined) {
      this.cart.push(produto);
      this.verificaBotao(produto.id, 'showRemove');
    }
    this.verificaCart();
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeCart(produtos: any) {
    const removeIndex = this.cart
      .map(function (item: any) {
        return item.id;
      })
      .indexOf(produtos);
    // remove object
    this.cart.splice(removeIndex, 1);
    this.verificaBotao(produtos, 'showAdd');
    this.verificaCart();
  }

  async onSubmit() {
    this.spinner.show();
    if (!this.confirmo) {
      this.spinner.hide();
      this.alert.ShowError(
        'Para continuar, voc?? deve concordar com os termos de uso'
      );
    } else {
      localStorage.setItem('confirmo', 'ok');
      if (this.cart.length > 0) {
        let ob = {
          contrato: this.contrato,
          produtos: this.cart,
        };
        let cadastra = await this.contratoItemService.addItemContrato(ob);
        this.spinner.hide();
        if (cadastra) {
          this.contratoComponent.contratos('itens');
          this.cart = [];
          this.hiddenRemover = true;
          this.confirmo = false;
          this.getProdutos();
          this.alert.success('Contrato alterado com sucesso!');
          $(document).ready(function () {
            $('#exampleModal').modal('hide');
          });
        }
      }
    }
  }
}
