# Adicionando validação de formulários com React Hook Form e componentes com Chakra UI e React Icons

## React Hook Form

A biblioteca [React Hook Form] (https://react-hook-form.com/) é uma biblioteca que auxilia na criação e validação dos formulários, reduzindo a quantidade de código desenvolvido e permite guardar estado e gerenciar o ciclo de vida do componente.

### Instalação e configurações inicias
Para instalar o React Hook Form basta rodar o comando **npm** com a dependência, conforme o exemplo abaixo. Nenhuma outra configuração é necessária.
```cmd
npm install react-hook-form
```

## Chakra UI

A [Chakra UI](https://chakra-ui.com/) é uma biblioteca simples, modular e accessível que permite construir blocos de componentes React de maneira mais rápida. Possui componentes de formulário, alerta, menus, tabelas e outros componentes de dados.

### Instalação e configurações inicias
Para instalar o Chakra UI basta rodar o comando **npm** com as dependências, conforme o exemplo abaixo:
```cmd
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```

Então pasta adicionar o *Provider* no componente **App** da aplicação.
```jsx
import  React  from  'react';
import  BaseRoutes  from  './routes/BaseRoutes';
import  "./App.css";
import { ChakraProvider } from  '@chakra-ui/react';

function  App() {
	return (
		<ChakraProvider>
			<BaseRoutes  />
		</ChakraProvider>
	);
}
export  default  App;
```

## React Icons

A biblioteca [React Icons](https://react-icons.github.io/) permite incluir os ícones presentes nas principais bibliotecas css em uma aplicação React. A biblioteca utiliza ES6 o que permite que sejam importados na versão final da aplicação apenas os ícones utilizados no desenvolvimento.

### Instalação e configurações inicias
Para instalar o React Icons basta rodar o comando **npm** com a dependência, conforme o exemplo abaixo. Nenhuma outra configuração é necessária.
```cmd
npm  install react-icons
```

### Lista de Produtos v2

Na lista de produtos foram utilizadas as bibliotecas Chakra UI e React Icons. Inicialmente com os imports do componente **Table** do Chakra UI, também foram importados os demais componentes para a tabela e também alguns componentes que ajudaram a criar o menu com as ações da tabela. Na sequência foram importados os ícones do React Icons.

```jsx
\\...outros imports da aplicação
import { Table, Thead,... } from  "@chakra-ui/react";
import {BsThreeDotsVertical, BsPencilSquare, BsTrash, BsPlusCircle} from  "react-icons/bs";
\\...restante do código do componente
```
Na sequência utilizamos o ícone **BsPlusCircle** do React Icons no botão de novo produto.

```jsx
\\...
<Link className="btn btn-success btn-icon col-md-2 mb-2"
to="/product-v2/new" title="Novo Produto">
	<BsPlusCircle  />  <span  style={{marginLeft:  10}}>Novo Produto</span>
</Link>
\\...
```
Então, foi utilizado o componente **Table** para exibição dos dados. Os demais componentes utilizados **Thead, Tbody, Tr, Td**, entre outros, também foram importados do Chakra UI.
```jsx
<TableContainer>
	<Table>
		<TableCaption>Lista de Produtos</TableCaption>
		<Thead>
			<Tr>
				<Th>#</Th>
				<Th>Nome</Th>
				<Th  isNumeric>Preço</Th>
				<Th>Categoria</Th>
				<Th>Ações</Th>
			</Tr>
		</Thead>
		<Tbody>
			{data.map((product) => (
				<Tr key={product.id}
				_hover={{ cursor:  "pointer", background:  #eee" }}
				>	
					<Td>{product.id}</Td>
					<Td>{product.name}</Td>
					<Td  isNumeric>{product.price}</Td>
					<Td>{product.category?.name}</Td>
					<Td>
						<Menu>
							<MenuButton
								as={IconButton}
								aria-label="Actions"
								icon={<BsThreeDotsVertical  size={20}  />}
								variant="ghost"							
							/>
							<MenuList>
								<MenuItem icon={<BsPencilSquare  />} 
									onClick={() =>  onEdit(`/product-v2/${product.id}`)}>Editar
								</MenuItem>
								<MenuItem icon={<BsTrash  />}
									onClick={() =>  onRemove(product.id)} > Remover
								</MenuItem>
							</MenuList>
						</Menu>
					</Td>
				</Tr>
			))}
		</Tbody>
		<Tfoot>
			<Tr>
				<Th>#</Th>
				<Th>Nome</Th>
				<Th  isNumeric>Preço</Th>
				<Th>Categoria</Th>
				<Th>Ações</Th>
			</Tr>
		</Tfoot>
	</Table>
</TableContainer>
```
### Formulário de Produtos v2

No cadastro de produtos foram utilizadas as bibliotecas React Hook Form e Chakra UI. Para utilizado o React Hoot Form foi importado o *custom hook* **useForm**. Do Chakra UI foram importados os componentes  **Input, Textarea e Select** para inserção de dados no formulário. O **Button** foi utilizado como botão de *submit* e os componentes **FormControl, FormLabel e FormErrorMessage** para auxiliar na construção do formulário.

```jsx 
import { useForm} from  "react-hook-form";
import { FormErrorMessage,
		 FormLabel,
		 FormControl,
		 Input,
		 Textarea,
		 Select,
		 Button
} from  "@chakra-ui/react";
```
Do *custom hook* **useForm** foram utilizados o **handleSubmit** para tratar o submit do form. O método **register** permite  _registrar_ um input, select ou outro componente para validação e posterior envio dos dados do formulário. O **formState** contém informações do *State* do formulário. E o método **reset** permite atualizar os dados do formulário.
```jsx
const {handleSubmit,register, formState: { errors, isSubmitting }, reset} = useForm();
```
No formulário o método **reset** foi utilizado para atualizar os valores do formulário com os dados carregados da API ao carregar o componente para atualizar um produto. Nesse caso o objeto **entity** será atualizado quando os dados do servidor forem carregados.
```jsx
\\...
	useEffect(() => {
		reset(entity);
	}, [entity, reset]);
\\...
```
Os demais itens das bibliotecas foram utilizados no formulário. O **handleSubmit** por exemplo, recebe como parâmetro o método do nosso componente que vai tratar o envio do formulário. No restante do formuário são adicionados os campos de entrada de dados **Input, Textarea e Select**, esses componentes são registrados e é adicionada a validação com o método **register**. Por fim, foi adicionado o botão *submit* que quando os dados estão corretos executa o método **onSubmit** e quando incorretos exibe os erros de validação no formulário.

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
	// Vai alterar o css do componente caso existam errors no name do produto
    <FormControl isInvalid={errors.name}>
      <FormLabel htmlFor="name">Nome</FormLabel>
      /* O método registrer é utilizado para registrar
      o input para o 'name' e colocar a validação de 'required'.
      A validação será exibida no componente FormErrorMessage
      */
      <Input
        id="name"
        placeholder="Nome do produto"
        {...register("name", {
          required: "O campo nome é obrigatório",
        })}
      />
      <FormErrorMessage>
        {errors.name && errors.name.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.price}>
      <FormLabel htmlFor="price">Preço</FormLabel>
      <Input
        id="price"
        placeholder="0.0"
        {...register("price", {
          required: "O campo preço é obrigatório",
          min: { value: 0.01, message: "O valor deve ser maior que zero" },
        })}
        type="number"
        step="any"
      />

      <FormErrorMessage>
        {errors.price && errors.price.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.description}>
      <FormLabel htmlFor="description">Descrição</FormLabel>
      <Textarea
        id="description"
        placeholder="Descrição do produto"
        {...register("description", {
          required: "O campo descrição é obrigatório",
          minLength: {                
            value: 2,
            message: "O tamanho deve ser entre 2 e 1024 caracteres"
          },
          maxLength: {                
            value: 1024,
            message: "O tamanho deve ser entre 2 e 1024 caracteres"
          }
        })}
        size="sm"
      />
      <FormErrorMessage>
        {errors.description && errors.description.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.category}>
      <FormLabel htmlFor="category">Categoria</FormLabel>
      <Select
        id="category"
        {...register("category", {
          required: "O campo categoria é obrigatório",
        })}
        size="sm"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        {errors.description && errors.description.message}
      </FormErrorMessage>
    </FormControl>
    <div className="text-center">
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={isSubmitting}
        type="submit"
      >
        Salvar
      </Button>
    </div>
  </form>
```