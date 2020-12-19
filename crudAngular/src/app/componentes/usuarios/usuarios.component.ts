import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  lista: any = [];
  limit = 10;
  start = 0;
  title = 'Inserir usuário'
  nome = '';
  email = '';
  idade = '';
  cidade = '';
  id = '';
  senha = '';

  constructor(
    private provider: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.lista = [];
    this.start = 0;
    this.carregar();
  }

  carregar() {
    this.lista = [];
    this.start = 0;
    return new Promise(resolve => {
      const dados = {
        requisicao : 'listar',
        limit : this.limit,
        start : this.start,
       };
      this.provider.Api(dados, 'crudPhp/apiUsuarios.php').subscribe(data => {
        for (const dado of data['result']) {
          this.lista.push(dado);
        }
        resolve(true);
      });
      });
    }

    cadastrar() {
      if(this.nome !== '' && this.email !== '' && this.idade !== '' && this.cidade !== '' && this.senha !== '') {
      return new Promise(resolve => {
        const dados = {
          requisicao : 'add',
          nome: this.nome,
          email: this.email,
          idade: this.idade,
          cidade: this.cidade,
          senha: this.senha
        };
        this.provider.Api(dados, 'crudPhp/apiUsuarios.php').subscribe(data => {

          if(data['success']){
            alert('Salvo com sucesso!!');
            this.router.navigate(['/usuarios']).then(nav => {
              window.location.reload();
             });
          }else{
            alert('Erro ao Salvar!!');
          }
        });
      });
    } else{
        alert('Preencha os Campos!');
      }
    }

    dadosEditar(nome:string, email:string, idade:string, cidade:string, id:string){
      this.title = 'Editar usuário'
      this.nome = nome;
      this.email = email;
      this.idade = idade;
      this.cidade = cidade;
      this.id = id;
    }

    editar(){
      if(this.nome !== '' && this.email !== '' && this.idade !== '' && this.cidade !== '') {
        return new Promise(resolve => {
          const dados = {
            requisicao : 'editar',
            nome: this.nome,
            email: this.email,
            idade: this.idade,
            cidade: this.cidade,
            id: this.id
          };
          this.provider.Api(dados, 'crudPhp/apiUsuarios.php').subscribe(data => {

            if(data['success']){
              alert('Editado com sucesso!!');
              this.router.navigate(['/usuarios']).then(nav => {
                window.location.reload();
               });
            }else{
              alert('Erro ao Editar!!');
            }
          });
        });
      } else{
          alert('Preencha os Campos!');
        }
    }

    excluir(idRecebido:string){
        return new Promise(resolve => {
          const dados = {
            requisicao : 'excluir',
            id : idRecebido
          };
          this.provider.Api(dados, 'crudPhp/apiUsuarios.php').subscribe(data => {

            if(data['success']){
              alert('Excluído com sucesso!!');
              this.router.navigate(['/usuarios']).then(nav => {
                window.location.reload();
               });
            }else{
              alert('Erro ao Excluir!!');
            }
          });
        });
    }
  }


