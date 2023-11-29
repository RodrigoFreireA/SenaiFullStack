import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {

    public produto: produto = new produto(0,"","","",0);

    constructor(private _produtoService: ProdutoService, private _router: Router) {}

    cadastrar(): void{
      this._produtoService.cadastrarProduto(this.produto).subscribe(
        Produto => {
          this.produto = new produto(0,"","","",0);
        alert("produto cadastrado com sucesso!")
              },
              err =>{
                alert("Erro ao cadastrar produto")
              }
      );

      this._router.navigate(["restrito/lista"]);
    }
    
}
