package com.DesafioMuralis.comercioSA.modules.cliente.controller;

import com.DesafioMuralis.comercioSA.exceptions.ErrorMessageDTO;
import com.DesafioMuralis.comercioSA.modules.cliente.dto.ClientRequestDTO;
import com.DesafioMuralis.comercioSA.modules.cliente.dto.ClientResponseDTO;
import com.DesafioMuralis.comercioSA.modules.cliente.model.Cliente;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DesafioMuralis.comercioSA.modules.cliente.service.ClienteService;
import com.DesafioMuralis.comercioSA.modules.contato.dto.ContatoResponseDTO;
import com.DesafioMuralis.comercioSA.modules.contato.service.ContatoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/cliente")
@Tag(name = "Cliente", description = "Endpoints relacionados ao cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ContatoService contatoService;

    @Operation(summary = "Busca todos os clientes no banco de dados", method = "GET", description = "Busca todos os clientes")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Cliente encontrado", 
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema (schema = @Schema(implementation = ClientResponseDTO.class)) )}
        )})
    @GetMapping
    public ResponseEntity<List<ClientResponseDTO>> listarTodos() {
        List<ClientResponseDTO> clientesDTO = clienteService.listarTodos()
            .stream()
            .map(cliente -> new ClientResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getCpf(),
                cliente.getData_nascimento(),
                cliente.getEndereco()
            ))
            .collect(Collectors.toList());

            return ResponseEntity.ok().body(clientesDTO);
    }

    @Operation(summary = "Busca um cliente pelo seu id", method = "GET", description = "Essa função é responsável por buscar um cliente pelo seu id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente buscado com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> buscarClientePorId(@PathVariable UUID id ) {
        Cliente client = clienteService.findById(id);

        ClientResponseDTO clientResponse = new ClientResponseDTO(
            client.getId(),
            client.getNome(),
            client.getCpf(),
            client.getData_nascimento(),
            client.getEndereco()
        );

        return ResponseEntity.ok().body(clientResponse);
    }

    @Operation(summary = "Busca todos os contatos de um cliente pelo seu id", method = "GET", description = "Essa função é responsável por buscar todos os contatos de um cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contatos encontrados",
                content = {@Content(mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = ContatoResponseDTO.class))
            )}),
        @ApiResponse(responseCode = "404", description = "Não foi encontrado nenhum contato com este id do cliente",
                content = { @Content(mediaType = "application/json", 
                array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))    
            )}),
        @ApiResponse(responseCode = "400", description = "ID inválido",
                content = { @Content(mediaType = "application/json", 
                array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))    
            )}),
    })
    @GetMapping("/{id}/contatos")
    public ResponseEntity<List<ContatoResponseDTO>> listarContatosPeloID(@PathVariable UUID id) {
        List<ContatoResponseDTO> contatosDTO = contatoService.buscarPorIdDoCliente(id)
            .stream()
            .map(contato -> new ContatoResponseDTO(
                contato.getId(),
                contato.getCliente().getId(),
                contato.getTipo(),
                contato.getValor(),
                contato.getObservacao()
            ))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok().body(contatosDTO);
    }

    @Operation(summary = "Cria um cliente", method = "POST", description = "Função responsável por criar um cliente")
    @ApiResponses( value = {
        @ApiResponse(responseCode = "200", description = "Cliente criado com sucesso",
            content = { @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ClientResponseDTO.class)    
        )}),
        
        @ApiResponse(responseCode = "409", description = "Quando já existe um cliente com este cpf",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))
        )}),

        @ApiResponse(responseCode = "400", description = "Dados errados/mal formatados",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))    
        )}),
    })

    @PostMapping
    public ResponseEntity<ClientResponseDTO> salvar(@Valid @RequestBody ClientRequestDTO cliente) {
        Cliente clienteCriado = clienteService.salvar(cliente);

        ClientResponseDTO clientResponse = new ClientResponseDTO(
            clienteCriado.getId(),
            clienteCriado.getNome(),
            clienteCriado.getCpf(),
            clienteCriado.getData_nascimento(),
            clienteCriado.getEndereco()
        );

        return ResponseEntity.ok().body(clientResponse);
    }

    @Operation( summary = "Atualiza os dados de um cliente", method = "PUT", description = "Função responsável por atualizar os dados de um cliente")
    @ApiResponses( value = {
        @ApiResponse(responseCode = "200", description = "Dados do cliente alterados com sucesso",
            content = { @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = ClientResponseDTO.class))
            )}),
        @ApiResponse(responseCode = "409", description = "Quando cpf já existe no sistema",
            content = { @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = ClientResponseDTO.class))
        )}),
        @ApiResponse(responseCode = "400", description = "Dados errados/mal formatados",
                content = { @Content(mediaType = "application/json", 
                array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))    
            )}),
})

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> atualizar(@Valid @RequestBody ClientRequestDTO cliente, @PathVariable UUID id) {

        Cliente clienteAtualizado = clienteService.atualizar(id, cliente);

        ClientResponseDTO clientResponse = new ClientResponseDTO(
            clienteAtualizado.getId(),
            clienteAtualizado.getNome(),
            clienteAtualizado.getCpf(),
            clienteAtualizado.getData_nascimento(),
            clienteAtualizado.getEndereco()
        );

        return ResponseEntity.ok().body(clientResponse);
    }

    @Operation( summary = "Exclui um cliente", method = "DELETE", description = "Função responsável por excluir um cliente")
    @ApiResponses( value = {
        @ApiResponse(responseCode = "200", description = "Cliente excluído com sucesso",
            content = { @Content(mediaType = "application/json", 
            schema = @Schema(implementation = String.class),
            examples = @ExampleObject(value = "Cliente excluído com sucesso!")    
        )}),
        
        @ApiResponse(responseCode = "404", description = "Não foi encontrado nenhum contato com este id do cliente",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))     
        )}),
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable UUID id) {
        clienteService.deletar(id);
        return ResponseEntity.ok().body("Cliente excluído com sucesso!");
    }
}