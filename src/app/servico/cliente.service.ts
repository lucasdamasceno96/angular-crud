import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/modelo/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //Url da api
  private url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  //metodo para selecionar todos os clientes
  selecionar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  // metodo para cadastrar
  cadastrar(obj: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, obj);
  }

  // metodo para editar clientes
  editar(obj: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url, obj);
  }

  // metodo para remover
  remover(codigo: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + codigo);
  }
}
