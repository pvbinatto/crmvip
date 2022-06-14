import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { JqueryService } from 'src/app/services/jquery.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  itens: any[] = [];
  total: any;
  files: any;

  produto = {
    id: '',
    name: '',
    price: '',
    period: '',
    link_imagem: '',
    enabled: false,
    category_id: ''
  };

  carregado = false;

  produtos_habilitados: any;

  categorias: any[] = [];

  constructor(private produtos: ProdutoService, private alert: AlertService, private router: Router) {}

  detalhes(item: any) {
    // item.price = item.price.toLocaleString('pt-br', {minimumFractionDigits: 2}).replace(".", ",");
    this.produto = item;
  }

  novo() {
    this.produto = {
      id: '',
      name: '',
      price: '',
      period: '',
      link_imagem: 'https://api.rest.vipautomacao.com.br/files/image/sem-foto.gif',
      enabled: false,
      category_id: ''
    };
  }

  geraBase64(event: any) {
    var file = event.target.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = this.handleFile.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  handleFile(event: any) {
    var binaryString = event.target.result;
    this.produto.link_imagem = 'data:image/jpg;base64,' + btoa(binaryString);
  }

  async getProdutos() {
    this.produtos_habilitados = await this.produtos.getProdutosCategoryWs();
    for (let i = 0; i < this.produtos_habilitados.length; i++) {
      const pd = this.produtos_habilitados[i];
      for (let x = 0; x < pd.products.length; x++) {
        const pd2 = pd.products[x];
        pd2.enabled =
          pd2.enabled === '0' ? (pd2.enabled = false) : (pd2.enabled = true);
        this.itens.push(pd2);
      }
    }

    if(this.itens.length > 0){
      this.carregado = true;
      JqueryService.jTable('1', 'asc', []);
    }
    
  }

  async onSubmit() {
    try {
      let ob = await this.produtos.produtosWs(this.produto);
      if (ob) {
        this.alert.success('Alterado com sucesso');
        JqueryService.closeModal();
        document.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    let prod = this.getProdutos();
  }
}
