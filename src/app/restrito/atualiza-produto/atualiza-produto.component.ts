import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-atualiza-produto',
  templateUrl: './atualiza-produto.component.html',
  styleUrls: ['./atualiza-produto.component.css']
})
export class AtualizaProdutoComponent implements OnInit{

  public produtoId: number = 0;
  public produto: produto = new produto(0,"","","",0);

  constructor(private _produtoService:ProdutoService, private _router: Router, 
    private _activatedRoute:ActivatedRoute){
      this._activatedRoute.params.subscribe(params => this.produtoId = params['id']);
    }
    
    ngOnInit(): void {
      this.listarProduto();
    }

    listarProduto(): void{
      this._produtoService.getProduto(this.produtoId).subscribe(
        (res: any) => {
          this.produto = new produto(
            res[0].id,
            res[0].produto,
            res[0].descricao,
            res[0].foto,
            res[0].preco
          );
        }
    )
  }

  atualizar(id: number){
    this._produtoService.atualizarProduto(id,this.produto).subscribe(
      Produto => {this.produto = new produto(0,"","","",0)},
      err => { alert("Erro ao atualizar produto")}
    );

    this._router.navigate(["restrito/lista"]);
  }

}
