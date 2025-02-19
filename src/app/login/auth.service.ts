import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario'; // Modelo de dados do usuário
import { Router } from '@angular/router'; // Serviço para navegação entre rotas
import { HttpClient } from '@angular/common/http'; // Serviço HTTP para realizar requisições
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' // Define que o serviço será provido no root module (singleton)
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  private API = 'https://dev.expressonepomuceno.com.br:10091/rest/api';

  constructor(private router: Router, private http: HttpClient) { }

  /**
   * Método para realizar o login do usuário
   * @param usuario - Objeto contendo as credenciais do usuário
   * @returns boolean - Indica o sucesso ou falha na autenticação
   */
  // Método que realiza a autenticação do usuário
  fazerLogin(usuario: Usuario): Promise<boolean> {
    // Retorna uma Promise que indicará se o login foi bem-sucedido (resolve) ou falhou (reject)
    return new Promise((resolve, reject) => {
        // Realiza uma requisição HTTP POST para o endpoint de autenticação da API
        this.http.post<any>(
          `${this.API}/oauth2/v1/token?grant_type=password&username=${usuario.name}&password=${usuario.senha}`, 
          usuario // Dados do usuário enviados no corpo da requisição
        ).subscribe({
            // Callback executado quando a requisição é bem-sucedida
            next: (result) => {
                // Verifica se a resposta contém o token de acesso
                if (result && result.access_token) {
                    // Define que o usuário está autenticado
                    this.usuarioAutenticado = true;

                    // Armazena o token no localStorage do navegador para uso futuro
                    window.localStorage.setItem('token', result.access_token);

                    // Emite um evento para exibir o menu de usuário autenticado
                    this.mostrarMenuEmitter.emit(true);

                    // Redireciona o usuário autenticado para a página de pets
                    this.router.navigate(['/pets']);

                    // Resolve a Promise com 'true', indicando que o login foi bem-sucedido
                    resolve(true);
                } else {
                    // Caso o token não esteja presente, o login falha
                    this.usuarioAutenticado = false;

                    // Emite um evento para ocultar o menu de usuário autenticado
                    this.mostrarMenuEmitter.emit(false);

                    // Resolve a Promise com 'false', indicando que o login falhou
                    resolve(false);
                }
            },
            // Callback executado quando a requisição falha
            error:(error) => {
                // Exibe o erro no console para depuração
                console.error('Erro ao fazer login:', error);

                // Define que o usuário não está autenticado
                this.usuarioAutenticado = false;

                // Emite um evento para ocultar o menu de usuário autenticado
                this.mostrarMenuEmitter.emit(false);

                // Rejeita a Promise com o erro capturado
                reject(error);
            }
    });
    });
}

  

  

  /**
   * Método para verificar se o usuário está autenticado
   * @returns boolean - Indica se o usuário está autenticado
   */
  usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  /**
   * Método para realizar logout e limpar o token
   */
  logout() {
    this.usuarioAutenticado = false;
    window.localStorage.removeItem('token');
    this.mostrarMenuEmitter.emit(false); // Emite evento para ocultar o menu
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
