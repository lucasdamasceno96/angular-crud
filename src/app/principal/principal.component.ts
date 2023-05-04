import { Component } from '@angular/core';
import { Cliente } from 'src/modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent {
  //objeto do tipo cliente
  client = new Cliente();

  //variavel para visibilidade dos botoes

  btnCadastro: boolean = true;

  //variavel para visibilidade da tabela
  tabela: boolean = true;

  //json de clientes

  clientes: Cliente[] = [];

  //construtor

  constructor(private servico: ClienteService) {}

  // metodo de selecao

  selecionar(): void {
    this.servico.selecionar().subscribe((retorno) => (this.clientes = retorno));
  }

  // metodo de cadastro
  cadastrar(): void {
    this.servico.cadastrar(this.client).subscribe((retorno) => {
      // cadastrar o cliente no vetor
      this.clientes.push(retorno);

      // limpar o formulario

      this.client = new Cliente();

      // mensagem
      alert('CLiente cadastrado com sucesso!');
    });
  }
  remover(): void {
    this.servico.remover(this.client.codigo).subscribe((retorno) => {
      this.clientes.pop();
      this.client = new Cliente();
      // visibilidade dos botoes e tabelas
      this.btnCadastro = true;
      this.tabela = true;
      alert('Removido com sucesso');
    });
  }

  // metodo para editar clientes
  editar(): void {
    this.servico.editar(this.client).subscribe((retorno) => {
      // obter posicao do vetor onde esta o cliente
      let posicao = this.clientes.findIndex((obj) => {
        return obj.codigo == retorno.codigo;
      });
      // alteracao
      this.clientes[posicao] = retorno;
      // visibilidade dos botoes e tabelas
      this.btnCadastro = true;
      this.tabela = true;
      alert('Alterado com sucesso!');
    });
  }

  // metodo de inicializacao
  ngOnInit() {
    this.selecionar();
  }

  // metodo para selecionar cliente especifico
  selecionarCliente(posicao: number): void {
    // selecionar cliente no vetor
    this.client = this.clientes[posicao];

    //visivilidade dos botoes
    this.btnCadastro = false;
    //visibilidade da tabela
    this.tabela = false;
  }
}
