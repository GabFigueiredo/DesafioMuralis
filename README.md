
# **Desafio Muralis**

> A empresa Comércio S.A. deseja modernizar sua gestão de contatos, substituindo a
agenda física por um sistema digital. Esse sistema deve permitir o cadastro de clientes e seus
respectivos contatos, facilitando a organização e o acesso às informações. Sua tarefa é
modelar e implementar uma solução completa para a gestão desse cadastro de clientes.

---

## **Índice**

1. [Sobre](#sobre)
2. [Tecnologias Usadas](#tecnologias-usadas)
3. [Instalação e Configuração](#instalação-e-configuração)
4. [Uso](#uso)
5. [Estrutura de Pastas](#estrutura-de-pastas)
6. [Funcionalidades](#funcionalidades)

---

## **Sobre**

O sistema facilita a gestão de clientes e seus contatos.

- **Frontend**: Este projeto utiliza React para criar uma interface de usuário interativa.
- **Backend**: A API foi construída com Spring, servindo como a camada de lógica de negócios e persistência de dados para a aplicação.

---

## **Tecnologias Usadas**

### **Frontend:**

- **Vite**
- **Typescript**
- **React.js** 
- **Styled-components** 
- **Axios** 
- **Cleave** 
- **React-hook-form** 
- **Zod** 
- **Radix** 
- **@mui/material** 

### **Backend:**

- **Java 17** 
- **Spring Boot** 
- **JPA (Jakarta Persistence API)** 
- **PostgreSQL**

---

## **Instalação e Configuração**

### **Pré-requisitos**

- Ter Java 17 e Maven instalado na máquina
- PostgreSQL instalado.
  
### **Frontend:**

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabFigueiredo/DesafioMuralis
   ```

2. Navegue até o diretório do frontend:
   ```bash
   cd DesafioMuralis-front
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### **Backend:**

1. Crie um banco de dados PostgreSQL

2. Navegue até o diretório do backend:
   ```bash
   cd comercioSA
   ```

3. Instale as dependências:
   ```bash
   mvn clean install
   ```

4. Crie um arquivo .env e configure as variáveis de ambiente. Exemplo:
   ```bash
    DB_URL=jdbc:postgresql://localhost:5432/Nome_do_banco
    DB_USERNAME=seu_nome
    DB_PASSWORD=sua_senha
   ```

5. Execute o servidor backend

---

## **Uso**

- **Frontend**: Após a instalação, a aplicação estará disponível em `http://localhost:5173`. Basta abrir no seu navegador para testar a interface.
- **Backend**: A API estará disponível em `http://localhost:8080/`. Teste os endpoints usando o Postman ou qualquer ou pela interface.
   Coleção de requests Postman: 

   Rotas:
   GET: /clientes, /contatos
   POST: /clientes, /contatos
   PUT: /clientes/{id}, /contatos/{id}
   DELETE: /clientes/{id}, /contatos/{id}

---

## **Estrutura de Pastas**

```
/DesafioMuralis-Front
   /public
   /src
      /@types
      /assets
      /components
      /contexts
      /interfaces
      /layouts
      /lib
      /pages
      /reducers
      /styles
      /utils

   /comercioSA
   /src
      /main
         /java
         /com
         /DesafioMuralis
            /comercioSA
               /controller
               /model
               /repository
               /service
   ```

---

## **Funcionalidades**

- [x] Cadastro de clientes (Nome, CPF, Data de Nascimento, Endereço)
- [x] Edição dos dados de um cliente cadastrado
- [x] Exclusão de um cliente cadastrado
- [x] Listagem de todos os clientes cadastrados
- [x] Busca de clientes pelo Nome ou CPF
- [x] Cadastro de contatos para um cliente (Tipo, Valor, Observação)
- [x] Edição dos contatos de um cliente
- [x] Exclusão de um contato de um cliente
- [x] Listagem de todos os contatos de um cliente específico

---

