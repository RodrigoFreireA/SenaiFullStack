import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { produto } from './models/produto.model';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  private url = "http://localhost:3000/produtos";
  
  constructor(private _httpClient: HttpClient) { }

  getProduto(id:any): Observable<produto> {
    const urlAtualizar = `${this.url}?id=${id}`;
    return this._httpClient.get<produto>(urlAtualizar);
  }

  getProdutos(): Observable<produto[]> {
    return this._httpClient.get<produto[]>(this.url);
  }

  cadastrarProduto(produto: produto): Observable<produto[]> {
    return this._httpClient.post<produto[]>(this.url, produto);
  }

  atualizarProduto(id: any, produto: produto): Observable<produto[]> {
    const urlAtualizar = `${this.url}/${id}`;
    return this._httpClient.put<produto[]>(urlAtualizar, produto);
  }
  removerProduto(id: any): Observable<produto[]> {
    const urlDeletar = `${this.url}/${id}`;
    return this._httpClient.delete<produto[]>(urlDeletar);
  }
}
