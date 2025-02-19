// Importação de dependências necessárias
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service'; // Serviço para interagir com os dados dos pets
import { Pet } from '../pet'; // Modelo de dados para pet
import { catchError, EMPTY, Subject, switchMap, take } from 'rxjs'; // Operadores do RxJS para manipulação de fluxos de dados
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'; // Biblioteca para exibir modais
import { AlertModalService } from '../../shared/alert-modal.service'; // Serviço para exibir alertas modais
import { ActivatedRoute, Router } from '@angular/router'; // Serviços para navegação e manipulação de rotas

@Component({
  selector: 'app-pets-lista', // Identificador do componente
  templateUrl: './pets-lista.component.html', // Template HTML associado ao componente
  styleUrls: ['./pets-lista.component.scss'], // Estilos específicos do componente
  preserveWhitespaces: true // Preserva espaços em branco no template HTML
})
export class PetsListaComponent implements OnInit {
  pets$: Array<Pet> | undefined; // Lista de pets carregados
  error$ = new Subject<boolean>(); // Sujeito para tratar erros de carregamento

  // Pet selecionado para edição ou exclusão
  petSelecionado: Pet = { 
    id: '',
    name: '',
    breed: '',
    color: '',
    sexo: '',
    specie: '',
    ownerid: ''
  };
  deleteModalRef!: BsModalRef; // Referência para o modal de exclusão

  // Construtor com injeção de dependências
  constructor(
    private modalService: BsModalService, // Serviço para exibir modais
    private service: PetsService, // Serviço para manipulação dos dados dos pets
    private alertService: AlertModalService, // Serviço para exibir alertas
    private router: Router, // Serviço para navegação programática
    private route: ActivatedRoute // Serviço para acessar dados da rota ativa
  ) {}

  /**
   * Método chamado ao inicializar o componente.
   * Carrega a lista de pets.
   */
  ngOnInit(): void {
    this.onRefresh();  
  }

  /**
   * Método para carregar ou atualizar a lista de pets.
   */
  onRefresh() {
    this.service.list().subscribe(response => {
      console.log(response); // Log dos dados recebidos
      this.pets$ = response; // Atualiza a lista de pets
    });
    // Código comentado para uso opcional do RxJS para tratamento de erros:
    /*
    .pipe(
      tap(response => console.log('resposta', response)), // Loga a resposta recebida
      catchError(error => {
        console.error(error); // Loga o erro no console
        this.handleError(); // Exibe mensagem de erro
        return EMPTY; // Retorna um fluxo vazio em caso de erro
      })
    );
    */
  }

  /**
   * Método para excluir um pet.
   * @param pet - O pet a ser excluído.
   */
  onDelete(pet: Pet) {
    this.petSelecionado = pet; // Define o pet selecionado
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse pet?'); // Exibe confirmação
    result$
      .pipe(
        take(1), // Aguarda apenas a primeira resposta
        switchMap(result => {
          if (result && pet.id) {
            return this.service.remove(pet.id); // Remove o pet se confirmado
          }
          return EMPTY; // Retorna fluxo vazio se não confirmado
        })
      )
      .subscribe(
        success => this.onRefresh(), // Atualiza a lista após exclusão
        error => {
          this.alertService.showAlertDanger('Erro ao remover pet. Tente novamente mais tarde'); // Exibe mensagem de erro
        }
      );
  }

  /**
   * Método para exibir mensagem de erro genérica ao carregar pets.
   */
  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar pets. Tente novamente mais tarde.');
    // Código comentado para exibir erro usando componente modal customizado:
    /*
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
    */
  }

  /**
   * Método para redirecionar à página de edição de um pet.
   * @param id - ID do pet a ser editado.
   */
  onEdit(id: number | string) {
    this.router.navigate(['editar', id], { relativeTo: this.route }); // Navega para a rota de edição relativa à rota atual
  }
}
