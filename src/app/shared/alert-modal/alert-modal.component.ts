// Importação de dependências necessárias
import { Component, Input } from '@angular/core'; // Decoradores do Angular
import { BsModalRef } from 'ngx-bootstrap/modal'; // Referência para manipular modais

@Component({
  selector: 'app-alert-modal', // Seletor para usar este componente no HTML
  templateUrl: './alert-modal.component.html', // Caminho do arquivo de template HTML
  styleUrls: ['./alert-modal.component.scss'] // Caminho do arquivo de estilos SCSS
})
export class AlertModalComponent {
  
  // Propriedade de entrada para exibir mensagens no modal
  @Input() message: string[] = []; // Mensagem de alerta, aceita um array de strings
  @Input() type = 'success'; // Tipo do alerta ('success', 'danger', 'info', etc.), com valor padrão 'success'

  /**
   * Construtor do componente.
   * Injeta a referência do modal para manipulá-lo.
   * @param bsModalRef - Referência para o modal atual, usada para fechá-lo.
   */
  constructor(public bsModalRef: BsModalRef) { }

  /**
   * Método acionado ao clicar no botão de fechar.
   * Fecha o modal.
   */
  onClose() {
    this.bsModalRef.hide(); // Fecha o modal usando a referência fornecida pelo `ngx-bootstrap`
  }
}
