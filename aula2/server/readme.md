# Utilizando o Swagger para documentar a API e o Flyway para migração do banco de dados em um projeto SpringBoot

## Swagger 

### Introdução

O  [Swagger ](https://swagger.io/)  é um conjunto de ferramentas utilizados para melhorar o processo de documentação de APIs. Neste projeto foi utilizada a biblioteca [Springfox](https://springfox.github.io/springfox/) para gerar os JSONs com o mesmo padrão adotado pelo Swagger. A própria biblioteca Springfox é responsável por mapear todos os *endpoints* da API assim como todos os *models* utilizados nesses *endpoints* e gerar o JSON com a documentação da API.

### Configurações iniciais

Esse exemplo utiliza um projeto SpringBoot utilizando o Maven para gerenciamento das dependências. As bibliotecas serão adicionadas no arquivo  **pom.xml**. A biblioteca abaixo encontra-se no  [Repositório Maven](http://mvnrepository.com/) e é necessária para o funcionamento do Springfox.

```xml
	<dependency>  
	 <groupId>io.springfox</groupId>  
	 <artifactId>springfox-boot-starter</artifactId>  
	 <version>3.0.0</version>  
	</dependency>
```

O próximo passo é configurar os dados básicos para geração da documentação da API. Para isso foi criada a classe **SwaggerConfig** dentro do pacote **config** da aplicação. O método **greetingApi()** cria um objeto do tipo **Docket** no qual são configurados os dados básicos para geração da documentação da API, por exemplo o tipo que será gerada a documentação, nesse exemplo **Swagger 2**. Os métodos **apiKey(), securityContext() e defaultAuth()** são utilizados para configurar o envio do **token** de autenticação nas requisições da API. Os demais detalhes da documentação podem ser consultados na [documentação da biblioteca Springfox](http://springfox.github.io/springfox/docs/current/#quick-start-guides).

```java
@Configuration  
@EnableSwagger2  
public class SwaggerConfig implements WebMvcConfigurer {  
  
	private ApiKey apiKey() {  
        return new ApiKey("JWT", "Authorization", "header");  
	}  
  
    private SecurityContext securityContext() {  
        return SecurityContext.builder().securityReferences(defaultAuth()).build();  
	}  
  
    private List<SecurityReference> defaultAuth() {  
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");  
  AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];  
  authorizationScopes[0] = authorizationScope;  
 return Arrays.asList(new SecurityReference("JWT", authorizationScopes));  
  }  
  
    @Bean  
  public Docket greetingApi() {  
        Docket docket = new Docket(DocumentationType.SWAGGER_2)  
                .securityContexts(Arrays.asList(securityContext()))  
                .securitySchemes(Arrays.asList(apiKey()))  
                .select()  
                .apis(RequestHandlerSelectors.any())  
                .paths(PathSelectors.any())  
                .build()  
                .apiInfo(metaData());  
 return docket;  
  }  
  
    private ApiInfo metaData() {  
        return new ApiInfoBuilder()  
                .title("Spring Boot REST API")  
                .description("\"Spring Boot REST API for greeting people\"")  
                .version("1.0.0")  
                .license("Apache License Version 2.0")  
                .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0\"")  
                .build();  
  }  
  
    @Override  
  public void addResourceHandlers(ResourceHandlerRegistry registry) {  
        //enabling swagger-ui part for visual documentation  
  registry.addResourceHandler("swagger-ui.html")  
                .addResourceLocations("classpath:/META-INF/resources/");  
  registry.addResourceHandler("/webjars/**")  
                .addResourceLocations("classpath:/META-INF/resources/webjars/");  
  }   
}
```

Outro item que deve ser cuidado é adicionar as regras para as URLs da documentação não serem bloqueadas pelo SpringSecurity. Para isso basta adicionar o código abaixo na classe **WebSecurity** que é responsável pelas configurações do SpringSecurity.

```java
	@Override  
	public void configure(org.springframework.security.config.annotation.web.builders.WebSecurity web) throws Exception {  
	    web.ignoring()  
		   .antMatchers("/h2-console/**",  
				    	"/swagger-resources/**",  
						"/swagger-ui.html",  
						"/swagger-ui/**",  
						"/v2/api-docs",  
						"/webjars/**");  
	}
```

### Funcionamento

A biblioteca Springfox irá gerar automaticamente toda a documentação, para acessar o resultado da documentação no formato interface, no caso deste projeto, basta acessar: [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/), serão listados todos os REST *controllers*, métodos HTTP presente em cada *controller* e também os *models* da aplicação. E para acessar a documentação no formato JSON basta acessar [http://localhost:8080/v2/api-docs](http://localhost:8080/v2/api-docs). Para fazer uma requisição basta acessar o **controller** escolher o método HTTP, clicar em **Try Out** e depois em **Execute**, caso seja uma requisição que dependa do envio de dados no corpo da requisição, o mesmo deverá ser preenchido no campo correspondente antes de clicar em **Execute**. Caso a o **endpoint** que será testado dependa de autenticação/autorização será necessário criar um usuário via *endpoint* para fazer o POST de um usuário, então executar o *endpoint* de autenticação (*login*), copiar o *token* que foi retorno da autenticação e clicar no botão **Authorize** na parte superior da página com a interface, na tela que abrir digitar o tipo do **token** e adicionar o **token** (ex.: Bearer ey.....restantedotokenjwtgerado).

## Flyway 

### Introdução

O  [Flyway](https://flywaydb.org/)  é uma biblioteca utilizada para migração de banco de dados. Qualquer alteração no *schema* do projeto podem facilmente ser controladas e auditadas utilizando o Flyway. Com as configurações padrão, durante a primeira execução da aplicação, é criada uma tabela automaticamente no banco de dados chamada  **flyway_schema_history**  em que serão armazenadas informações para o controle das versões do *schema* do projeto.

### Configurações iniciais

Esse exemplo utiliza um projeto SpringBoot utilizando o Maven para gerenciamento das dependências. As bibliotecas serão adicionadas no arquivo  **pom.xml**. A biblioteca abaixo encontra-se no  [Repositório Maven](http://mvnrepository.com/) e é necessária para o funcionamento do Flyway.

```xml
	<dependency>  
	 <groupId>org.flywaydb</groupId>  
	 <artifactId>flyway-core</artifactId>  
	</dependency>
```

O próximo passo é configurar as credenciais de acesso ao banco de dados no arquivo de configuração **application.yml**. O banco de dados utilizado neste exemplo foi o H2, mas pode ser alterado para utilizar qualquer outro SGBD (PostgreSQL, MongoDB, MySQL, MariaDB, Microsoft SQL Server, entre outros). O arquivo está dividido em *profiles* sendo que o profile ativo é o **dev** cada conjunto de '- - - ' delimita um profile.

``` yml
spring:  
  profiles:  
    active: dev  
  datasource:  
    generate-unique-name: false  
 h2:  
    console:  
      enabled: true  
 path: /h2-console  
  jpa:  
    properties:  
      javax:  
          persistence:  
              validation:  
                mode: none  
      hibernate:  
          format_sql: true  
    show-sql: true  
 data:  
      web:  
        pageable:  
          default-page-size: 10  
          max-page-size: 100  
---  
spring:  
  config:  
    activate:  
      on-profile: prod  
  datasource:  
    url: jdbc:h2:mem:pw26s-prod  
  jpa:  
    hibernate:  
      ddl-auto: none  
  h2:  
    console:  
      enabled: false  
 flyway:  
    locations: classpath:/db/prod  
---  
spring:  
  config:  
    activate:  
      on-profile: dev  
  datasource:  
    url: jdbc:h2:mem:pw26s-dev  
  jpa:  
    hibernate:  
      ddl-auto: none  
  flyway:  
    locations: classpath:/db/dev  
---  
spring:  
  config:  
    activate:  
      on-profile: test  
  jpa:  
    hibernate:  
      ddl-auto: create-drop  
  flyway:  
    locations: classpath:/db/test
   ```

Após as configurações iniciais é necessário criar a pasta em que serão armazenados os scripts SQL para criação/alteração dos schemas. O caminho padrão é: **src/main/resources/db/migration**. Mas nesse projeto esse caminho foi editado no aquivo **application.yml**, sendo que para cada *profile* de execução foi criado um caminho diferente para armazenar os *scripts*. Por exemplo, **flyway: locations: classpath:/db/dev** é o caminho dos *scripts* para o *profile* **dev** utilizado para o desenvolvimento.

Para nomear os arquivos de script deve ser adotado o padrão da biblioteca, o qual tambem possui uma ordem de execução, tudo está descrito na [documentação do Flyway](https://flywaydb.org/documentation/concepts/migrations.html#naming-1).

### Funcionamento

Após criados os arquivos de script SQL nos diretórios e nomeados conforme a documentação, será possível realizar a primeira migração, a qual contém o script inicial para criação do banco de dados. Executando o projeto as migrações serão executadas na ordem do versionamento e para cada script executado será adicionado um registro na tabela **flyway_schema_history**.

A tabela **flyway_schema_history** contém uma chave primária, a versão do banco de dados, a descrição, o tipo do script (geralmente SQL), o nome do arquivo do script, o checksum do arquivo de script. Nessa tabela também é exibido o usuário do banco de dados que foi utilizado para executar o script, a data de execução, o tempo de execução e por fim um valor booleano indicando se a migração ocorreu com sucesso.

O framework Flyway executa os passos abaixo para validar o banco de dados da aplicação:
The framework performs the following steps to accommodate evolving database schemas:
1. Verifica se o banco de dados possui a tabela  **flyway_schema_history**, caso ela não exista é criada.
2.  Busca no classpath da aplicação por arquivos contendo migrações. 
3.  Compara cada arquivo de migração encontrado com os dados existentes na tabela de histório. Se o número de versão do arquivo for menor que o da última atualização existente no banco de dados, eles são ignorados.
4.  Caso existam migrações para serem executadas o framework coloca em fila. As migrações são executadas da menor versão para maior.
5.  Cada migração é executada e a tabela **flyway_schema_history** é atualizada.