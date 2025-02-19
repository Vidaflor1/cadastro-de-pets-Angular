// Importação das dependências necessárias
import { HttpClient } from '@angular/common/http'; // Serviço para realizar requisições HTTP
import { Injectable } from '@angular/core'; // Decorador para indicar que a classe pode ser injetada em outros componentes ou serviços
import { Pet, PetReceber } from './pet'; // Modelo de dados para representar pets
import { delay, map, Observable, take, tap } from 'rxjs'; // Operadores do RxJS para manipulação de observables

@Injectable({
  providedIn: 'root' // Disponibiliza o serviço em toda a aplicação
})
export class PetsService {
  // URL base para as requisições à API
  private readonly API = 'https://dev.expressonepomuceno.com.br:10091/rest/api/v1/pets';

  // Construtor do serviço com injeção do HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Método para listar todos os pets.
   * Realiza uma requisição GET e aplica um delay de 2 segundos (simulando latência).
   * @returns Observable contendo um array de pets.
   */
  list():Observable<any>{
    return this.http.get<PetReceber>(this.API)
    .pipe(
      map(response => response.items),
      delay(2000),
    );
  }

  /**
   * Método para carregar um pet pelo ID.
   * Realiza uma requisição GET para um recurso específico da API.
   * @param id - Identificador do pet.
   * @returns Observable contendo os dados do pet.
   */
  loadByID(id: number) {
    return this.http.get<Pet>(`${this.API}/${id}`).pipe(take(1)); // Realiza apenas uma emissão
  }

  /**
   * Método privado para criar um novo pet.
   * Envia os dados do pet para a API usando uma requisição POST.
   * @param pet - Dados do pet a serem criados.
   * @returns Observable contendo a resposta da API.
   */
  private create(pet: Pet) {
    return this.http.post(this.API, pet).pipe(take(1)); // Realiza apenas uma emissão
  }

  /**
   * Método privado para atualizar um pet existente.
   * Envia os dados atualizados do pet para a API usando uma requisição PUT.
   * @param pet - Dados atualizados do pet.
   * @returns Observable contendo a resposta da API.
   */
  private update(pet: Pet) {
    return this.http.put(`${this.API}/${pet.id}`, pet).pipe(take(1)); // Realiza apenas uma emissão
  }

  /**
   * Método público para salvar os dados de um pet.
   * Decide entre criar um novo pet ou atualizar um existente com base na presença de um ID.
   * @param pet - Dados do pet a serem salvos.
   * @returns Observable contendo a resposta da API.
   */
  save(pet: Pet) {
    console.log(pet); // Loga os dados do pet para fins de depuração
    if (pet.id) {
      return this.update(pet); // Atualiza o pet se o ID estiver presente
    }
    return this.create(pet); // Cria um novo pet caso contrário
  }

  /**
   * Método para remover um pet pelo ID.
   * Realiza uma requisição DELETE para excluir o recurso.
   * @param id - Identificador do pet a ser removido.
   * @returns Observable contendo a resposta da API.
   */
  remove(id: string) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1)); // Realiza apenas uma emissão
  }
}
