json-server --watch db.json
# Descrição do Projeto: Sistema de Gestão de Pets com Autenticação
Objetivo
O projeto consiste em um sistema web para gerenciamento de informações sobre pets, permitindo a realização de operações como cadastro, listagem, edição e exclusão de registros. Além disso, conta com um sistema de autenticação de usuários para controlar o acesso às funcionalidades.

Tecnologias Utilizadas
Angular: Framework para desenvolvimento do frontend.
RxJS: Biblioteca para manipulação de fluxos assíncronos.
Bootstrap (ngx-bootstrap/modal): Para exibição de modais e alertas.
HTTPClient: Para realizar requisições à API backend.
Router Angular: Para gerenciamento de rotas e navegação entre páginas.
Módulos do Sistema
1. Autenticação de Usuário
Implementação do LoginComponent para entrada de credenciais do usuário.
Uso do AuthService para validação de login.
AuthGuard garantindo que apenas usuários autenticados possam acessar determinadas rotas.
2. Gestão de Pets
PetsService: Serviço responsável por conectar-se à API e manipular dados de pets.
Métodos para listar, buscar, criar, editar e excluir pets.
PetsListaComponent: Página para exibir a lista de pets cadastrados, permitindo exclusão e edição.
PetsFormComponent: Formulário para cadastro e edição de pets, com validações e mensagens de erro.
3. Controle de Navegação
AuthGuard impede acesso a determinadas rotas sem autenticação.
Router permite navegação para edição e criação de registros.
Funcionalidades Principais
✔️ Login e autenticação de usuários.
✔️ Controle de acesso via AuthGuard.
✔️ Listagem de pets com carregamento assíncrono.
✔️ Cadastro, edição e exclusão de pets.
✔️ Alertas modais para confirmar ações.
✔️ Integração com API externa para persistência de dados.
