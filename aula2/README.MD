# Spring Framework (back-end)

## Introdução

O Spring é um conjunto de projetos que focam em levar produtividade ao programador. Auxiliando de maneira a aumentar a produtividade no desenvolvimento de aplicações Java com simplicidade e flexibilidade. 
O conjunto de frameworks Spring possui o Spring MVC para criação de aplicações web e serviços RESTful, o Spring Data, para  acesso a banco de dados, o Spring Security, para prover segurança em aplicações, e diversos outros projetos como cloud computing, microsserviços e big data, por exemplo.  
Os projetos Spring são todos **Open Source** e o seu código-fonte pode ser encontrado no [GitHub](https://github.com/spring-projects) [1].

## Spring e Java EE

O Spring possui uma série de recursos implementados que não estão presentes no Java EE. Entretanto, o framework Spring também utiliza várias tecnologias que estão implementadas dentro do Java EE. Não existe uma concorrência entre o Spring e o Java EE, o Spring apenas veio para dar maior produtividade ao desenvolvedor com os recursos disponibilizados no framework. 

## Inversão  de Controle (IoC) e  Injeção de Dependências (DI) com Spring

A inversão de controle (ou Inversion of Control – IoC) consistem em transferir o controle da execução da aplicação para um container de IoC, o qual chama a aplicação em determinados momentos da execucão do software, como na ocorrência de um evento. Por meio da IoC o container controla quais métodos da aplicação e em que contexto eles serão chamados [2].

A Injeção de dependências (ou Dependency Injection – DI) é um é um padrão de projeto usado para desacoplar classes de suas dependências dentro de uma aplicação, dessa maneira é possível  obter uma melhor modularização do software [3].

## Spring Data JPA
O *framework* Spring Data JPA atua na camada de persistência [4]. Ele auxilia o programador na criação dos repositórios da aplicação. O projeto (Spring Data JPA) está dentro do Spring Data que possui diversos outros projetos que auxiliam no processo de acesso e persistência de dados. Sendo os principais projetos:
-   Spring Data Commons
-   Spring Data for Apache Cassandra
-   Spring Data Gemfire
-   Spring Data KeyValue
-   Spring Data LDAP
-   Spring Data MongoDB
-   Spring Data Redis
-   Spring Data REST

## REST
REST é a sigla para **Representational State Transfer** ou em português **Transferência de Estado Representacional.** Uma aplicação web RESTful expõe informações sobre si na apresentando seus recursos. Ela também possibilita ao cliente executar ações nesses recursos, como criar novos recursos (por exemplo, criar um novo usuário) ou alterar recursos existentes (por exemplo, editar os dados de um usuário).

Para que uma API web seja RESTful, é necessário  seguir um conjunto de regras ao escrevê-la. O conjunto de regras para uma API REST às tornará mais fáceis de usar e também mais fáceis de descobrir, o que significa que um desenvolvedor que está apenas começando a usar suas APIs terá mais facilidade em aprender como fazê-lo. Isso significa que quando uma API RESTful é chamada, o servidor _transfere_ para o cliente uma _representação_ do _estado_ do recurso solicitado.

REST não é uma arquitetura, biblioteca ou framework, é simplesmente um  **modelo** que é utilizado para projetar arquitetura de softwares distribuídos que fazem comunicação de dados pela rede, seja local ou a famosa Internet.

REST não é uma arquitetura ou *framework* pronto, é apenas um contjunto de regras que serve como modelo para desenvolver uma API. Esse modelo foi criado por  Roy Fielding [5]  um dos principais responsáveis e criadores do protocolo HTTP, basicamente, tudo que está online utiliza o protocolo HTTP ou o HTTPS que é a evolução do mesmo.

# React (front-end)
O React é uma biblioteca JavaScript para criar interfaces de usuário. O React é **declarativo** fazendo com que a criação de UIs interativas seja uma tarefa fácil. Uma das premissas do React é que o desenvolvedor crie *views* simplificadas para cada estado da aplicação, e o React irá atualizar e renderizar de forma eficiente apenas os componentes necessários na medida em que os dados mudam. A criação de *views* declarativas fazem com que seu código seja mais previsível e simples de depurar [7].

O React assim como outras bibliotecas e *frameworks* JavaScript é baseado em componentes. O que facilita gerenciar de maneira mais eficaz os diferentes módulos da aplicação. O React permite criar componentes encapsulados que gerenciam seu próprio estado, para então combinálo para formar UIs complexas.

No React toda lógica do componente é escrita em JavaScript e não em templates, permitindo ao desenvolvedor passar diversos tipos de dados ao longo da sua aplicação e ainda manter o estado da aplicação fora do DOM.

O React normalmente utiliza JSX (**JavaScript Syntax Extension**) para a criação dos componentes, que é uma extensão de sintaxe para JavaScript. A utilização do JSX e a criação de componentes será abordada mais abaixo desse texto.

# Iniciando o projeto
Durante as aulas será desenvolvido um projeto para controle de compra e venda de produtos. Vamos iniciar com o cadastro de usuários do sistema, tanto a API Rest quanto o cliente utilizando React. Então será realizada a etapa de autenticação dos usuários do sistema. Na sequência serão realizados os CRUDs de categoria, produto e compras.

### Iniciando o desenvolvimento

#### Criação do projeto back-end
O projeto será criado utilizando como base o *framework* Spring Boot, que por sua vez permite que projetos com o Spring MVC, Data JPA e Security já venham configurados por meio de convenções. 
Será criado um projeto [Maven](https://maven.apache.org/) por meio da ferramenta web [Spring Initializr](https://start.spring.io/) com as seguintes configurações:
O projeto será do tipo **Maven Project**.
A linguagem será **Java**.
A versão do Spring Boot será a versão estável atual na data de criação do projeto (**2.6.6**).
Os metadados do projeto são:
- Group: **br.edu.utfpr.pb.web**
- Artifact: **server**
- Options: 
	- Packaging: **Jar** 	
	- Java: **11** ou **18** (utilizar a versão instalada na máquina, preferência pela mais atual).

Em dependências devem ser selecionados os *frameworks*:
- Spring Data JPA
- Spring Web
- Spring Security
- Spring Devtools
- H2 Database (ou o driver do banco de sua preferência PostgreSQL, MySQL, etc...)
- Lombok
- Validation

O projeto está configurado e pode ser realizado o download do mesmo e importado na IDE. O conteúdo do arquivo `pom.xml` pode ser visualizado em: [arquivo pom.xml](https://github.com/viniciuspegorini/pw26s-2022-1/blob/main/aula1/server/pom.xml).

#### Estrutura do projeto back-end

O projeto Spring Boot vêm com uma série de configurações inicias que não precisamos nos preocupar, iniciando com a classe principal da aplicação a **ServerApplication**, nela por meio da anotação **@SpringBootApplication** todas as configurações serão carregadas. O **Spring Security** por exemplo, já vem pré-configurado protegendo todas as URLs, como ainda não vamos configurar, é necesário adicionar a propriedade **exclude = SecurityAutoConfiguration.class**, dessa maneira o **SpringBoot** vai ignorar as configurações de segurança, na sequência do desenvolvimento essa configuração será alterada para o processo de autenticação e autorização funcionar. O banco de dados **H2** também já é criado por padrão nesse momento, ou seja, todas as configurações necessárias para o início do desenvolvimento estão prontas.

```java
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)  
public class ServerApplication {  
   public static void main(String[] args) {  
      SpringApplication.run(ServerApplication.class, args);  
  }   
}
``` 

#### Cadastro de Usuário (back-end)

O desenvolvimento irá iniciar o cadastro de usuário o primeiro passo será criar o cadastro de um novo usuário. Para isso devemos criar nosso controller, entretanto como o desenvolvimento será realizado por meio de TDD, a primeira classe que vamos criar será a classe **UserControllerTest** dentro da pasta **/src/test**.
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {
}
```` 

A anotação **@SpringBootTest** permite que o nosso teste rode a partir das configurações padrão do Spring, ou seja as várias convenções do *framework* para iniciar o projeto já estão pré-configuradas. O Spring permite que a aplicação seja executada em diferentes ambientes (*profiles*), ou seja, teste, desenvolvimento, produção, etc., assim, por meio da anotação **@ActiveProfiles("test")** está sendo informado que o projeto será executado com base no *profile test*, isso irá permitir que na sequência do desenvolvimento do projeto ele possa ser executado por meio de configurações diferentes dentro de cada ambiente. 

O próximo passo é criar o primeiro teste, para nomear cada teste será utilizado:
**methodName_condition_expectedBehaviour**

Dentro da classe  **UserControllerTest** será criado o método ***postUser_whenUserIsValid_receiveOk()***, ou seja ao realizar um HTTP POST, quando o objeto enviar for um Usuário válido deve-se receber um ***HTTP Status: 200 OK***. O objeto ***testRestTemplate*** permite que possamos realizar requisições HTTP para uma URL, no caso do exemplo */users* e tenhamos acesso à resposta vinda da requisição.
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {
	@Autowired
	TestRestTemplate testRestTemplate;
	
	@Test
	public void postUser_whenUserIsValid_receiveOk() {
		User user = new User();
		user.setUsername(“test-user”);
		user.setDisplayName(“test-Display”);
		user.setPassword(“P4ssword”);
		ResponseEntity<Object> response = testRestTemplate.postForEntity(“/users”, user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}
}
```
Com o teste implementado será necessário começar resolver o que esperamos de comportamento da API. Iniciamente será criado uma classe **User**, com os atributos **username**, **displayName** e **password**. A classe deve ser criada na pasta **/src/main/java** no pacote **br.edu.utfpr.pb.web.model**.  Note que no exemplo a classe possui a anotação **@Data** que vem do **lombok**, dependência que foi adicionada ao projeto. Por meio dessa anotação ao compilar a classe o lombok gera os métodos getters e setters evitando assim que seja necessário criar esses códigos manualmente durante o desenvolvimento. Outras anotações do lombok serão utilizadas dentro deste projeto, sempre com a mesma intenção, evitar escrever código e deixar nossas classes mais limpas. Agora a classe **User** pode ser importada dentro da classe de teste.

```java
package br.edu.utfpr.pb.web.model;

@Data
public class User {
	private String username;
	private String displayName;
	private String password;
}
```
O próximo passo é criar a versão inicial da classe **UserController**, dentro do pacote **br.edu.utfpr.pb.web.controller**, essa classe deve ter um méto que aceita uma requisição do tipo HTTP Post para a URL  */users*. Por meio da anotação **@RestController** uma classe pode criar métodos para receber requisições HTTP. A anotação **@RequestMapping("users")** serve para que essa classe trate todas as requisições vindas em **/users**, independente do método HTTP. Por fim, foi criado o método **createUser()** o qual, por meio da anotação **@PostMapping** irá atender uma requisicão do tipo HTTP POST na URL */users*. Feito isso podemos executar nosso teste. Ele vai passar, por mais que o método não tenha nada implementado, ao ser chamado ele vai retornar um ***HTTP Status: 200 OK***, parâmetro esperado pelo primeiro teste criado. Ou seja, agora foi criada a primeira parte da API REST.

```java
@RestController
@RequestMapping("users")
public class UserController {

	@PostMapping
	void createUser() {
	}
}
```

O próximo teste será utilizado para verificar se após receber a requisição HTTP do tipo POST, o usuário enviado na requisição foi efetivamente salvo no banco de dados. Agora é necessário utilizar o **Spring Data** para armazenar o usuário no banco de ados.

```java
//...
public class UsuarioControllerTest {
	@Autowired
	UserRepository userRepository;
	//...
	@Test
	public void postUser_whenUserIsValid_userSavedToDatabase() {
		User user = createValidUser();
		testRestTemplate.postForEntity(“/users”, user, Object.class);
		// Agora precisamos garantir que tudo foi salvo no Banco de Dados.
		assertThat(userRepository.count()).isEqualTo(1);
	}
}
```
O primeiro passo para resolver o teste é fazer com que a classe **User** possa ser lida como uma entidade que pode ser persistida no banco de dados por meio da anotação **@Entity**. Toda a classe que é mapeada com @Entity deve possuir uma chave primária e a mesma deve ser anotada com **@Id**. Além disso é necessário informar como será gerado o incremento da chave primária, o que deve ser feito por meio da anotação **@GeneratedValue**, a qual por padrão incrementa o **Id** automáticamente somando 1 ao valor da chave primária a cada novo registro.
```java
\\...
@Entity
@Data
public class User {

	@Id
	@GeneratedValue
	private long id;
	private String username;
	\\... o restante da classe permanece igual
}
```
Agora é necessário criar as operações de escrita e leitura no banco de dados, isso por ser feito por meio da *interface* **JpaRepository**, disponibilizada pelo *framework* Spring Data. A *interface* **UserRepository** será criada dentro do pacote **br.edu.utfpr.pb.web.repository**. Ao herdar as características de **JpaRepository** a *interface* conta com os principais métodos CRUD, tais como *save(), delete(), findAll(), findById()*, entre outros. Agora a classe **UserRepository** pode ser importada dentro da classe de teste.

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```
Agora é possível utilizar a interface **UserRepository ** para persistir um usuário no banco de dados. Nesse momento será criada a classe **UserService**, dentro do pacote **br.edu.utfpr.pb.web.service**, para controlar as operações realizadas com a interface **UserRepository** e o banco de dados. Assim é possível manter todas as regras de negócio da aplicação fora da classe **controller**, além disso também é possível fazer o controle transacional do banco de dados por meio da classe **UserService**.

```java
@Service
public class UserService {
	UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	public User save (User user){
		return userRepository.save(user);
	}
}
```
Para salvar o usuário basta fazer a injeção de **UserService **, então utilizar o método ***userService.save()*** que espera como parâmetro de entrada um objeto do tipo **User**, o objeto será persistido no banco de dados. Nesse momento é possível executar o teste e o mesmo vai passar.

```java
@RestController  
@RequestMapping("users")  
public class UserController {  
	@Autowired  
	private UserService userService;  
  
    @PostMapping  
	void createUser(@RequestBody User user) {  
        userService.save(user);    
	}
```
Para evitar problemas durante a execução dos testes é importante limpar o banco de dados a cada execução, para isso vamos criar um método que remove os registros do banco a cada execução.
``` java
//...
public class UsuarioControllerTest {
	//...
	@BeforeEach
	public void cleanup() {
		userRepository.deleteAll();
		testRestTemplate.getRestTemplate().getInterceptors().clear();
	}
	//...
}
```
Podemos testar a API via requisição HTTP fora do nosso ambiente de testes, como ainda não iniciamos a criação do cliente com React, é necessário utilizar um *software* como o Postman ou Insomnia. Antes de criar o teste no **software** é necessário fazer alguns ajustes no projeto. Primeiro será necessário criar um arquivo de configuração para que tenhamos acesso ao banco de dados que está sendo utilizado durante os testes, o H2. Dentro da pasta **/src/main/resources/** criar o arquivo **application.yml**.  Muito cuidado na **indentação** do código do aquivo **yml** pois é a maneira que ele utiliza para acessar a árvore de propriedades. As configurações servem para que sejá possível gerar um nome de banco de dados único ao executara aplicação (*jdbc:h2:mem:testdb*) e para que possa ser acessado o console do banco por meio da URL **http://localhost:8080/h2-console**.
```yml
spring:
	datasource:
		generate-unique-name: false
	h2:
		console:
			enabled: true
			path: /h2-console
```

Ao acessar a URL **http://localhost:8080/h2-console** em um navegador irá abrir a tela de conexão do **H2** a configuração está praticamente pronta, bastando alterar a URL de conexão com o banco para: **jdbc:h2:mem:testdb**. Ao clicar para realizar a conexão temos acesso ao banco de dados gerado, por enquando foi criada apenas a tabela **User**, ao clicar na tabela é habilitado o console no qual podemos realizar consultas. Ao fazer um **select * from user** e executar o comando recebemos uma tabela vazia como resultado, para adicionar um usuário no banco de dados será utilizados o Postman.

#### Realizando uma requisição HTTP POST por meio do Postman
Ao abrir o Postam basta clicar em **File > New Tab** e uma nova aba para realizar requisições HTTP será aberta. No método selecionar a opção **POST** e na URL **http://localhost:8080/users**. O próximo passo é configurar o corpo da requisição com um objeto JSON representando um usuário. Clicar na aba **Body** marcar a opção **raw** e no final das opções selecionar **JSON**. Com isso é possível adicionar no corpo da requisição o objeto que representa um usuário.
```json
{
	"username" : "user-test",
	"displayName" : "user-dispay-test",
	"password": "P4ssword"
}
```
Adicionado o **JSON** basta clicar em send e a requisição será enviada para a API, o retorno que aparece em **Response** é um **200 OK** sem nenhum outro texto, pois é assim que está o código por enquanto. Agora é possível executar novamente o **select** no banco **H2** e consultar o usuário que foi adicionado na base de dados.

#### Continuando o desenvolvimento da API
No próximo teste será retornado ao cliente que chama a API além do **status HTTP**, uma mensagem de sucesso. A mensagem irá retornar por meio de um objeto do tipo **GenericResponse**.

```java
	\\...
	@Test
	public void postUser_whenUserIsValid_receiveSuccessMessage() {
	User user = createValidUser();
	ResponseEntity<GenericResponse> response = testRestTemplate.postForEntity(API_USERS, user, GenericResponse.class);
	assertThat(response.getBody().getMessage()).isNotNull();
}
```

A classe **GenericResponse** será criada no pacote **br.edu.utfpr.pb.web.shared** e por enquanto terá apenas o atributo **message**.

```java
@Data  
@NoArgsConstructor  
public class GenericResponse {  
	private String message;  
	public GenericResponse(String message) {  
	    this.message = message;  
	}  
}
```
A próxima alteração de código será realizado no método **createUser()** da classe **UserController**, que agora deverá retornar um objeto do tipo **GenericResponse**. Após essa alteração o teste criado irá passar. Para visualizar o comportamento na prática a requisição pode ser realizada novamente por meio do Postman.

```java
	\\...
	@PostMapping  
	GenericResponse createUser(@RequestBody User user) {  
		userService.save(user);  
		return new GenericResponse("Registro salvo");  
	}
	\\...
```
Com essa etapa finalizada, agora serão adicionadas algumas melhorias no código e na maneira com que os dados são persistidos. Ao fazer o **select** no banco de dados é possível observar que a coluna **password** está sendo armazenada como texto, o que não é uma boa prática. O teste a seguir irá validar se a senha salva no banco está diferente da senha que foi enviada para cadastro, o que sinaliza que ela estará criptografada no banco de dados.

```java
	@Test
	public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {
		User user = createValidUser();
		testRestTemplate.postForEntity(API_USERS, user, Object.class);
		List<User> users = userRepository.findAll();
		User userBD = users.get(0);
		assertThat(userBD.getPassword()).isNotEqualTo(user.getPassword());
}
```
A criptografia da senha será realizada na classe **UserService** para evitar que regras de negócio da aplicação sejam implementadas na classe **controller**. Para criptografia da senha será utilizada a classe **BCryptPasswordEncoder**[6]. Ao executar o método **bCryptPasswordEncoder.encode()** a senha será criptografada antes de ser salva no banco. Ao executar o teste ele vai passar. Para visualizar na prática só executar a requisição via Postman e conferir no console do **H2**.

```java
@Service  
public class UserService {
	UserRepository userRepository;  
	BCryptPasswordEncoder bCryptPasswordEncoder;  
  
	public UserService(UserRepository userRepository) {  
	    this.userRepository = userRepository;  
		this.bCryptPasswordEncoder = new BCryptPasswordEncoder();  
	}  
	public User save(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()) );  
		return userRepository.save(user);
	}
}
```
Com isso finalizamos essa etapa de desenvolvimento da API, as demais validações e tratamento de erros será realizado futuramente, o próximo passo será iniciar o desenvolvimento do lado cliente da aplicação.

#### Criação do projeto front-end
Para criação da aplicação *front-end* com React será utilizada a ferramenta **Create React App**, a qual gera uma estrutura base para o projeto. Para utilizar a ferramenta é necessário abrir o **terminal** ou **cmd** navegar até a pasta na qual o projeto será criado e executar o comando:
```cmd
npx create-react-app client
```
O `npx` faz parte da instalação do **Node.js** e irá instalar o `create-react-app` caso ele não esteja instalado e após irá executá-lo. Com isso será criada uma pasta **client** e dentro dela todos os arquivos necessários para executar a aplicação.
Para executar a aplicação pela primeira vez basta acessar a pasta client via **terminal** ou **cmd** e executar o comando:
```cmd
npm start
```
A aplicação será iniciada e poderá ser acessada no navegador por meio do endereço: **http://localhost:3000**.


#### Estrutura do projeto front-end

Entendendo a estrutura do projeto criado:
- **node_modules**: pasta com as dependências do projeto.
- **public**: pasta com o único arquivo HTML da aplicação, o index.html.
	- **index.html**: é o único arquivo HTML da aplicação e é obrigatório. Não será necessário modificá-lo e deve ser mantida a div _root_, pois o conteúdo dinâmico da aplicação será exibido dentro dessa div.
- **src**: pasta com os códigos do projeto.
	-   **index.js**: esse arquivo declara a renderização da aplicação utilizando a biblioteca _react-dom_. Esse arquivo não precisa ser modificado, ele serve de _entrypoint_ da aplicação e por isso deve ter a configuração mínima para tal.
	- **App.js**: é um componente componente React que vem criado no projeto inicial. Ao abrir o arquivo, é possível observar que existe código JSX dentro dele. Esse código é retornado pelo método _render()_, que é padrão de todos os objetos  _Component_  do React. Ele retorna a representação HTML daquele componente que será exibida no navegador.
	- **App.test.js**: é o arquivo de testes para o componente _App.js_.
	- **App.css**: é o arquivo com os estilos CSS para o componente _App.js_.
- **package.json**: arquivo de dependências do projeto. Todo projeto que utiliza o NodeJS precisa desse arquivo. As principais dependências do React já estão declaradas assim como os scripts de deploy da aplicação.

#### Cadastro de Usuário (front-end)

Depois de criado o projeto é possível iniciar o desenvolvimento dos novos componentes. Abrindo um novo **terminal/cmd** é possível executar os testes da aplicação, por meio do comando:
```cmd
npm test
```
O próximo passo é abrir o projeto na **IDE** escolhida e iniciar a criação do cadastro de usuários. Dentro da pasta **/src** criar a pasta **/pages**. E dentro dessa pasta os arquivos:
- UserSignupPage.spec.js
- UserSignupPage.js
Ao salvar esses arquivos o terminal que está executando os testes irá apontar um erro, pois todo o arquivo de teste (**UserSignupPage.spec.js**) deve ter pelo menos um caso de teste escrito. Como o desenvolvimento está sendo realizado com TDD, o próximo passo é criar esse teste. Começando com a importação do _React_ o passo seguinte é criar os rótulos do arquivo de teste por meio do método _describe()_, ele serve somente para melhorar a visualização dos testes no **terminal/cmd**.  O primeiro teste criado será o ***has header of Sign Up***, nele vamos verificar se nosso documento possui uma ***tag*** HTML com o texto **Sign Up**. Sim, serão realizados testes **e2e** [8] via Jest [9], por isso não estamos procurando por elementos dentro do nosso componente em JSX e sim por HTML, pois estamos preocupados em simular o comportamento do usuário. Ao salvar o documento o **terminal/cmd** executando os testes irá acusar um erro, e o próximo passo é resolvê-lo.

```javascript
import  React  from  "react";
import  UserSignupPage  from  "./UserSignupPage";

describe('UserSignupPage', () => {
	describe('Layout', () => {
		it('has header of Sign Up', () => {**
			const { container } = render(<UserSignupPage />); 
			const header = container.querySelector('h1');
			expect(header).toHaveTextContent('Sign Up');
		});
	});
});
```

Para resolver o erro é necessário fazer ajustes no componente que será desenvolvido no arquivo **UserSignUpPage.js**.  É necessário importar o _React_, então é criada a classe que vai conter o componente. Esse componente irá herdar as características de _React.Component_ e o método _render()_ será responsável por fazer o _render_ do código JSX contido nele. Esse método irá retornar uma _tag_ `<div>` contendo uma _tag_ `<h1>` com o texto **Sign Up**, com isso o primeiro teste irá passar, e no **terminal/cmd** não aparecerão outros erros para resolver.
```javascript
import React from "react";

export class UserSignupPage extends React.Component{
	render() {
		return (
			<div>
				<h1>Sign Up</h1>
			</div>
		)
	}
}
export default UserSignupPage;
```
Na sequência será criado um teste para verificar a existência dos campos no formulário de cadastro de um novo usuário. O primeiro campo que deverá constar no formulário é o campo para o usuário informar o seu _nome_ (_displayName_), para verificar esse campo será criado o teste ***has input for display name***.  Esse teste irá verificar se o componente **UserSignupPage** possui uma _tag_ do tipo **input** com **placeholder** contendo o texto **Informe seu nome**. Agora deverá ser resolvido o teste.

```javascript
import  React  from  "react";
import  UserSignupPage  from  "./UserSignupPage";

describe('UserSignupPage', () => {
	describe('Layout', () => {
		it('has header of Sign Up', () => {**
			const { container } = render(<UserSignupPage />); 
			const header = container.querySelector('h1');
			expect(header).toHaveTextContent('Sign Up');
		});
		
		it('has input for display name', () => {
			const { queryByPlaceholderText } = render(<UserSignupPage />);
			const displayNameInput = queryByPlaceholderText('Informe seu nome');
			expect(displayNameInput).toBeInTheDocument();
		});
	});
});
```

Para resolver o teste basta adicionar o componente **UserSignupPage** uma _tag_ **input** com as características especificadas.

```jsx
import React from "react";

export class UserSignupPage extends React.Component{
	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<div>
					<input placeholder="Informe seu nome" />
				</div>
			</div>
		)
	}
}
export default UserSignupPage;
```

No arquivo [UserSignupPage.spec.js](https://github.com/viniciuspegorini/pw26s-2022-1/blob/main/aula1/client/src/pages/UserSignupPage.spec.js) estão os testes: ***has input for username*** e ***has input for password***, ambos seguem a mesma lógica.

Verificar se o campo senha está exibindo o texto ao digitar é importante, pois uma _tag_ do tipo **password** evita que os caracteres que estão sendo digitados pelo usuário fiquem visíveis. Então vamos garantir que temos um campo do tipo **password** criando um novo teste dentro do rótulo _describe('Layout', () => {...})_. Nesse teste a função _queryByPlaceholderText()_ procura pelo **input** que irá receber a senha e verifica se ele tem o **type="password"**.

```javascript
	\\...
	it('has password type for password input', () => {
		const { queryByPlaceholderText } = render(<UserSignupPage />);
		const passwordInput = queryByPlaceholderText('Informe sua senha');
		expect(passwordInput.type).toBe('password');
	});
	\\...
```
Para resolver o teste, basta adicionar o **type="password"** no campo de senha.
```jsx
\...
<div>
	<input type="password" placeholder="Confirme sua senha" />
</div>
\...
```
No arquivo [UserSignupPage.spec.js](https://github.com/viniciuspegorini/pw26s-2022-1/blob/main/aula1/client/src/pages/UserSignupPage.spec.js) estão os testes: ***has input for password repeat*** e ***has password type for password repeat input***, eles foram adicionados para o usuário ter um campo para confirmar a senha. O teste seguinte verifica se existe um componente para o usuário fazer o envio dos dados, ou seja, um **button**.

```javascript
	\...
	it('has submit button', () => {
		const { container } = render(<UserSignupPage />);
		const button = container.querySelector('button');
		expect(button).toBeInTheDocument();
	});
	\...
```
Basta adicionar um componente do tipo **button** no componente **UserSignupPage**.
```jsx
	<div>
		<button>Cadastrar</button>
	<div>
```
Os testes para verificar se todos os foram adicionados no nosso componente foram criados e estão passando, futuras alterações no código desse componente não devem interferir no resultado dos testes. Os testes criados a seguir irão verificar o processo de interação do usuário com o componente e como os dados são armazenados no estado (_state_) do mesmo. Os novos testes ficarão dentro do rótulo _Interactions_.
```javascript
\\...
describe('UserSignupPage', () => {
	describe('Layout', () => {
		\\...
	});
	describe('Interactions', () => {
		\\...
	});
});
```
O primeiro teste de interação verifica se o valor digitado pelo usuário no campo **displayName** fica armazenado no _input_.

```javascript
\\...
describe('Interactions', () => {
	it('sets the displayName value into state', () => {
		const { queryByPlaceholderText } = render(<UserSignupPage />);
		const displayNameInput = queryByPlaceholderText('Informe seu nome');
		const changeEvent = {
			target: {
				value: 'my-display-name'
			}
		};
		fireEvent.change(displayNameInput, changeEvent);
		expect(displayNameInput).toHaveValue('my-display-name');
	});
});
\\...
```
O teste está funcionando, o valor está atribuído ao _input_, entretanto, ainda não conseguimos fazer nada com esse valor, agora ele será armazenado no _State_ do componente. Ao declarar o ***displayName*** no _State_ e o ***value={this.state.displayName}*** no _input_ e salvar, o teste vai gerar erro, pois o valor do _State_ não está sendo atualizado ao digitar novos valores no componente. Para resolver foi criado a função ***onChangeDisplayName()*** e a mesma foi adicionada no método _onChange()_ do _input_ ***onChange={this.onChangeDisplayName}***. Agora sim, o teste vai passar e os valores atribuidos ao _input_ será armazenado no _State_.
```jsx
import React from "react";

export class UserSignupPage extends React.Component{
	export default UserSignupPage;
	state = {
		displayName: '',
	}
	onChangeDisplayName = (event) => {
		const value = event.target.value;
		this.setState({displayName: value});
	}
	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<div>
					<input placeholder="Informe seu nome" 
						value={this.state.displayName} 
						onChange={this.onChangeDisplayName}
					/>
				</div>				
				\... demais inputs e button
			</div>
		)
	}
}
```
O próximo passo é repetir o processo para todos os componentes do tipo _input_, inicialmente criando o teste e depois fazendo as alterações no componente. Conforme pode ser observado nos arquivos [UserSignupPage.spec.js](https://github.com/viniciuspegorini/pw26s-2022-1/blob/main/aula1/client/src/pages/UserSignupPage.spec.js) e [UserSignupPage.js](https://github.com/viniciuspegorini/pw26s-2022-1/blob/main/aula1/client/src/pages/UserSignupPage.js).


# Referências
[1] Spring Framework, https://spring.io/.

[2] JOHNSON, R. E.; FOOTE, B.. Designing reusable classes. Journal of Object-Oriented Programming, 1(2):22–35, 1988.

[3] Prasanna, D.R., Dependency Injection: Design Patterns Using Spring and Guice, isbn=9781933988559, Manning- Manning Pubs Co Series,  url=https://books.google.com.br/books?id=b6O6OgAACAAJ, 2009.

[4] Spring Data JPA - Disponível em: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference

[5] Fielding, Roy. Architectural Styles and the Design of Network-based Software Architectures  Disponível em: https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf 

[6] BCryptPasswordEncoder. Disponível em: https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.html

[7] React. Disponível em: https://pt-br.reactjs.org/.

[8] e2e testing. Disponível em: https://reactjs.org/docs/testing.html

[9] Jest. Disponível em:  https://jestjs.io/