import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service'; // Serviço responsável pela autenticação do usuário
import { Router } from '@angular/router'; // Serviço para navegação entre rotas

// O decorator @Injectable torna a classe disponível para injeção de dependências
@Injectable({
  providedIn: 'root' // Define que o serviço será provido no root module (singleton)
})
export class AuthGuard implements CanActivate { // Implementa a interface CanActivate para controle de acesso às rotas

  // O construtor injeta as dependências necessárias para o funcionamento do guard
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Método que verifica se o usuário tem permissão para acessar uma rota específica
   * @param route - Informações da rota que está sendo acessada
   * @param state - Estado atual do roteamento
   * @returns Observable<boolean> ou boolean - Indica se a rota pode ser ativada
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // Verifica se o usuário está autenticado usando o serviço de autenticação
    if (this.authService.usuarioEstaAutenticado()) {
      return true; // Permite o acesso à rota
    }
    // Se o usuário não estiver autenticado, redireciona para a página de login
    this.router.navigate(['/login']);
    return false; // Bloqueia o acesso à rota
  }
}
