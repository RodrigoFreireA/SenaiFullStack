import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit {

  public produtos: produto[] = [];

  constructor(private _produtoService: ProdutoService, private _router: Router, private _loginService:LoginService) {}



  ngOnInit(): void {
    this.listarProdutos();
    this._loginService.setMostrarMenu(false);
  }
  listarProdutos(): void {
    this._produtoService.getProdutos().subscribe(
      retornaProduto => {
        this.produtos = retornaProduto.map(
          item => {
            return new produto(
              item.id,
              item.produto,
              item.descricao,
              item.foto,
              item.preco
            );
          }
        )
      }
    )
  }

  excluir(id: number){
    this._produtoService.removerProduto(id).subscribe(
      produto => {
        this.listarProdutos();
        alert("Produto Excluído com sucesso!")
      },
      err => {alert("Erro ao Excluir")}
    );

      this._router.navigate(["/restrito/lista"]);

  }


}
