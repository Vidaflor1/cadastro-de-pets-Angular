import { AuthService } from './auth.service'; // Importa o serviço de autenticação
import { Component } from '@angular/core';
import { Usuario } from './usuario'; // Modelo de dados para o usuário

// Decorator que define o componente Angular
@Component({
  selector: 'app-login', // Selecionador usado no HTML para referenciar este componente
  templateUrl: './login.component.html', // Template HTML associado ao componente
  styleUrls: ['./login.component.scss'] // Arquivo de estilos específico do componente
})
export class LoginComponent {
  // Objeto que armazena as credenciais do usuário
  usuario: Usuario = { name: '', senha: '' };

  // Mensagem de erro para feedback ao usuário
  errorMessage = '';

  // O construtor injeta o serviço de autenticação
  constructor(private authService: AuthService) { }

  /**
   * Método responsável por realizar o login do usuário
   */
  async fazerLogin() {
    // Verifica se os campos de nome do usuário e senha foram preenchidos
    if (!this.usuario.name || !this.usuario.senha) {
        // Caso estejam vazios, define uma mensagem de erro e encerra a execução
        this.errorMessage = 'Usuário e senha são obrigatórios. Preencha os campos.';
        return; // Retorna para evitar prosseguir com a tentativa de login
    }

    try {
        // Chama o método 'fazerLogin' do serviço de autenticação (authService)
        // A palavra-chave 'await' pausa a execução até que a Promise seja resolvida
        const sucesso = await this.authService.fazerLogin(this.usuario);

        // Verifica se a autenticação foi bem-sucedida
        if (!sucesso) {
            // Caso contrário, define uma mensagem de erro
            this.errorMessage = 'Usuário ou senha inválidos. Tente novamente.';
        }
    } catch (error) {
        // Captura qualquer erro ocorrido durante a tentativa de login
        // Exibe uma mensagem de erro genérica
        this.errorMessage = 'Usuário ou senha inválidos. Tente novamente.';
    }
}

  

}
