// Importação de dependências necessárias
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para criação e validação de formulários reativos
import { PetsService } from '../pets.service'; // Serviço para manipulação de dados dos pets
import { AlertModalService } from '../../shared/alert-modal.service'; // Serviço para exibir alertas modais
import { Location } from '@angular/common'; // Serviço para navegação (voltar à página anterior)
import { ActivatedRoute } from '@angular/router'; // Para acessar os dados da rota ativa
import { Pet } from '../pet'; // Modelo de dados para o pet
import { map, switchMap } from 'rxjs'; // Operadores para manipulação de observáveis

@Component({
  selector: 'app-pets-form', // Identificador do componente
  templateUrl: './pets-form.component.html', // Arquivo de template do componente
  styleUrl: './pets-form.component.scss', // Arquivo de estilos associado ao componente
})
export class PetsFormComponent {
  form: FormGroup = new FormGroup({}); // Inicializa o formulário como um FormGroup vazio
  submitted = false; // Controle para verificar se o formulário foi submetido
  isEditing: boolean = false; // Indica se está no modo de edição

  // Construtor com injeção de dependências necessárias para o funcionamento do componente
  constructor(
    private fb: FormBuilder, // Construtor de formulários reativos
    private service: PetsService, // Serviço de manipulação de dados dos pets
    private modal: AlertModalService, // Serviço para exibir mensagens de alerta
    private location: Location, // Serviço para navegar entre páginas
    private route: ActivatedRoute // Serviço para acessar dados da rota ativa
  ) {}

  /**
   * Método acionado ao submeter o formulário.
   * Valida os dados, envia as informações para o serviço e exibe mensagens de feedback.
   */
  onSubmit() {
    this.submitted = true; // Marca o formulário como submetido

    if (this.form.valid) { // Verifica se o formulário é válido
      let msgSuccess = 'Pet criado com sucesso!';
      let msgErro = 'Erro ao criar pet, tente novamente!';
      
      // Ajusta mensagens para o caso de edição
      if (this.form.value.id) {
        msgSuccess = 'Pet atualizado com sucesso!';
        msgErro = 'Erro ao atualizar pet, tente novamente!';
      }

      // Prepara o objeto para envio
      const obj = this.form.value;
      if (!obj.id) {
        delete obj.id;
    }
      obj.ownerid = '000001'; // Define um ID fixo para o dono (ajustar em produção)

      // Chama o serviço para salvar ou atualizar o pet
      this.service.save(obj).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess); // Exibe mensagem de sucesso
          setTimeout(() => this.location.back(), 3000); // Retorna à página anterior após 3 segundos
        },
        error => {
          this.modal.showAlertDanger(msgErro); // Exibe mensagem de erro
          console.error(error); // Loga o erro no console
        }
      );
    }
  }

  /**
   * Método acionado ao clicar no botão de cancelar.
   * Reseta o formulário e redefine o estado de submissão.
   */
  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  /**
   * Método chamado ao inicializar o componente.
   * Inicializa o formulário com os dados do pet carregados (se em modo de edição).
   */
  ngOnInit(): void {
    const pet = this.route.snapshot.data['pet']; // Obtém os dados do pet a partir do resolver
    this.isEditing = !!pet.id; // Define o modo de edição com base na presença do ID

    // Inicializa o formulário com os dados do pet e validações
    this.form = this.fb.group({
      id: [pet.id],
      name: [pet.name, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      breed: [pet.breed, [Validators.required, Validators.maxLength(250)]],
      color: [pet.color, [Validators.required, Validators.maxLength(250)]],
      sexo: [pet.sexo, [Validators.required, Validators.maxLength(250)]],
      specie: [pet.specie, [Validators.required, Validators.maxLength(250)]],
    });
  }

  /**
   * Verifica se um campo possui um erro específico e foi tocado ou submetido.
   * @param controlName - Nome do controle no formulário
   * @param errorName - Nome do erro a ser verificado
   */
  hasSpecificError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.hasError(errorName) && (control.touched || this.submitted) : false;
  }

  /**
   * Retorna os erros de validação associados a um campo.
   * @param field - Nome do campo
   */
  hasError(field: string) {
    return this.form.get(field)?.errors;
  }
}
