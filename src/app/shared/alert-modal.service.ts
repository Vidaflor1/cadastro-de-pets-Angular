// Importação das dependências necessárias
import { Injectable } from '@angular/core'; // Para tornar o serviço injetável no Angular
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'; // Para manipulação de modais com ngx-bootstrap
import { AlertModalComponent } from './alert-modal/alert-modal.component'; // Importa o componente de modal customizado
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

// Definição de tipos para os alertas (tipos de mensagem)
export enum AlertTypes {
  DANGER = 'danger', // Tipo de alerta para erro (danger)
  SUCCESS = 'success' // Tipo de alerta para sucesso (success)
}

@Injectable({
  providedIn: 'root', // Tornando o serviço disponível globalmente na aplicação
})
export class AlertModalService {
  // Construtor do serviço, com injeção da dependência do BsModalService
  constructor(private modalService: BsModalService) {}

  // Método privado para mostrar um alerta
  private showAlert(message: string, type: AlertTypes) {
    // Cria e exibe o modal de alerta com o componente AlertModalComponent
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    
    // Define o tipo e a mensagem no conteúdo do modal
    bsModalRef.content.type = type;  // Tipo de alerta (sucesso ou erro)
    bsModalRef.content.message = message; // Mensagem do alerta
  }

  // Método público para mostrar um alerta de erro (danger)
  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER); // Chama o método showAlert com tipo 'danger'
  }

  // Método público para mostrar um alerta de sucesso (success)
  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS); // Chama o método showAlert com tipo 'success'
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt
    }
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
