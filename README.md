
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

- **Next.js**
- **Typescript**
- **Tailwind CSS** 
- **Axios** 
- **React-hook-form** 
- **Zod** 
- **Shadcnui**
- **React Query** 

### **Backend:**

- **Java 17** 
- **Spring Boot** 
- **JPA (Jakarta Persistence API)** 
- **PostgreSQL**

---

## **Instalação e Configuração**

### **Pré-requisitos**

- Ter Java 17 e Maven instalado na máquina
- PostgreSQL ou Docker instalado.
  
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

1. Se não tiver Docker instalado na máquina: crie um banco de dados PostgreSQL

2. Navegue até o diretório do backend:
   ```bash
   cd comercioSA
   ```

3. Instale as dependências:
   ```bash
   mvn clean install
   ```

4. Configure as variáveis de ambiente em "application.properties". Exemplo:
   ```bash
    DB_URL=jdbc:postgresql://localhost:5432/Nome_do_banco
    DB_USERNAME=seu_nome
    DB_PASSWORD=sua_senha
   ```

## **Uso**

- **Frontend**: Após a instalação, a aplicação estará disponível em `http://localhost:3000`. Basta abrir no seu navegador para testar a interface.
- **Backend**: A API estará disponível em `http://localhost:8080/`. Teste os endpoints usando as coleções anexadas ou pela interface. 

---

## **Estrutura de Pastas**

```
/front-next
   /public
   /src
      /app
      /components
      /hooks
      /interfaces
      /lib
      /pages
      /templates

/comercioSA
/src
   /main
      /java
      /com
      /DesafioMuralis
         /comercioSA
            /config
            /exceptions
            /modules
              /controller
              /dto
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

