import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PetsService } from '../pets.service'; // Serviço que gerencia dados dos pets
import { Pet } from '../pet'; // Interface ou modelo representando um pet

// Decorator @Injectable que define o serviço como disponível para injeção no root module
@Injectable({
  providedIn: 'root' // Define que o serviço é um singleton no root module
})
export class PetResolverGuard implements Resolve<Pet> { // Implementa a interface Resolve<Pet>

  // Injeta o serviço PetsService para manipular dados dos pets
  constructor(private service: PetsService) {}

  /**
   * Método que resolve os dados necessários antes de ativar a rota.
   * @param route - Snapshot da rota atual, contendo parâmetros e outras informações
   * @param state - Snapshot do estado atual do roteamento
   * @returns Observable<Pet> - Um observable contendo os dados do pet ou um pet vazio no caso de erro
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet> {
    // Verifica se existe um parâmetro 'id' na rota
    if (route.params && route.params['id']) {
      // Chama o serviço para buscar o pet pelo ID e trata possíveis erros
      return this.service.loadByID(route.params['id']).pipe(
        catchError((error) => {
          console.error('Erro ao carregar Pet:', error); // Loga o erro no console
          // Retorna um pet vazio padrão no caso de erro
          return of(this.createEmptyPet());
        })
      );
    }
    // Retorna um pet vazio padrão se o parâmetro 'id' não estiver presente na rota
    return of(this.createEmptyPet());
  }

  /**
   * Método auxiliar para criar um objeto Pet vazio
   * @returns Pet - Um objeto Pet com propriedades padrão
   */
  private createEmptyPet(): Pet {
    return {
      name: '', // Nome vazio
      breed: '', // Raça vazia
      color: '', // Cor vazia
      sexo: '', // Sexo vazio
      specie: '', // Espécie vazia
      ownerid: ''
    };
  }
}
