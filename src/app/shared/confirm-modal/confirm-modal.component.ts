// Importação de dependências necessárias
import { BsModalRef } from 'ngx-bootstrap/modal'; // Referência para manipular modais
import { Component, Input } from '@angular/core'; // Decoradores do Angular
import { Subject } from 'rxjs'; // Para emitir eventos observáveis

@Component({
  selector: 'app-confirm-modal', // Seletor para usar este componente no HTML
  templateUrl: './confirm-modal.component.html', // Caminho do template HTML
  styleUrl: './confirm-modal.component.scss' // Caminho do arquivo de estilos SCSS
})
export class ConfirmModalComponent {
  // Propriedades de entrada, permitindo personalização do modal via atributos no template
  @Input() title: string = ''; // Título do modal
  @Input() msg: string = ''; // Mensagem exibida no modal
  @Input() cancelTxt = 'Cancelar'; // Texto do botão de cancelamento
  @Input() okTxt = 'Sim'; // Texto do botão de confirmação

  // Propriedade para emitir o resultado da confirmação
  confirmResult: Subject<boolean>;

  /**
   * Construtor do componente.
   * Injeta a referência do modal para manipulá-lo e inicializa o `confirmResult`.
   * @param BsModalRef - Referência para o modal atual.
   */
  constructor(public BsModalRef: BsModalRef) {
    this.confirmResult = new Subject(); // Inicializa o Subject para emitir eventos
  }

  /**
   * Método executado quando o componente é inicializado.
   * Pode ser usado para configurações adicionais, se necessário.
   */
  ngOnInit(): void {
    // Chamada após a inicialização do componente e propriedades de entrada.
    // Neste caso, o `confirmResult` já foi inicializado no construtor.
  }

  /**
   * Método chamado ao clicar no botão de confirmação.
   * Emite o valor `true` para o observador e fecha o modal.
   */
  onConfirm() {
    this.confirmAndClose(true); // Confirma a ação e fecha o modal
  }

  /**
   * Método chamado ao clicar no botão de cancelamento ou para fechar o modal.
   * Emite o valor `false` para o observador e fecha o modal.
   */
  onClose() {
    this.confirmAndClose(false); // Cancela a ação e fecha o modal
  }

  /**
   * Método privado para emitir o resultado e fechar o modal.
   * @param value - Valor a ser emitido para indicar a ação do usuário (true para confirmar, false para cancelar).
   */
  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value); // Emite o valor para o `Subject`
    this.BsModalRef.hide(); // Fecha o modal
  }
}
