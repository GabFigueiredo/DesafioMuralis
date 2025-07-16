package com.DesafioMuralis.comercioSA.modules.contato.controller;

import org.hibernate.annotations.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DesafioMuralis.comercioSA.exceptions.ErrorMessageDTO;
import com.DesafioMuralis.comercioSA.modules.contato.dto.ContatoRequestDTO;
import com.DesafioMuralis.comercioSA.modules.contato.dto.ContatoResponseDTO;
import com.DesafioMuralis.comercioSA.modules.contato.model.Contato;
import com.DesafioMuralis.comercioSA.modules.contato.service.ContatoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/contatos")
@Tag(name = "Contato")
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    @Operation(summary = "Buscar todos os contatos", method = "GET", description = "Função responsável por buscar todos os contatos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contatos buscados com sucesso!",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ContatoResponseDTO.class))
        )
    })
    @GetMapping
    public ResponseEntity<List<ContatoResponseDTO>> listarTodos() {
        List<ContatoResponseDTO> listaContatos = contatoService.listarTodos()
            .stream()
            .map(contato -> new ContatoResponseDTO(
                contato.getId(),
                contato.getCliente().getId(),
                contato.getTipo(),
                contato.getValor(),
                contato.getObservacao()
            ))
            .collect(Collectors.toList());

            return ResponseEntity.ok().body(listaContatos);

    }

    @Operation(summary = "Lista um contato pelo seu Id", method = "GET", description = "Função responsável por buscar um contato pelo seu id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contato buscado com sucesso!",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ContatoResponseDTO.class))
        ),

        @ApiResponse(responseCode = "404", description = "Contato não encontrado",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))
        )}),

        @ApiResponse(responseCode = "400", description = "ID inválido",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))    
        )}),
    })
    @GetMapping("/{id}")
    public ResponseEntity<List<ContatoResponseDTO>> listarPorID(@PathVariable UUID id) {
        List<ContatoResponseDTO> listaContatos = contatoService.buscarPorIdDoCliente(id)
        .stream()
        .map(contato -> new ContatoResponseDTO(
            contato.getId(),
            contato.getCliente().getId(),
            contato.getTipo(),
            contato.getValor(),
            contato.getObservacao()
        ))
        .collect(Collectors.toList());

        return ResponseEntity.ok().body(listaContatos);
    }

    @Operation(summary = "Cria um contato", method = "POST", description = "Função responsável por criar um contato")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contato criado com sucesso!",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ContatoResponseDTO.class))
        ),
    })
    @PostMapping
    public ResponseEntity<ContatoResponseDTO> salvar(@Valid @RequestBody ContatoRequestDTO contato) {
        Contato novoContato = contatoService.salvar(contato);

        ContatoResponseDTO contatoResponse = new ContatoResponseDTO(
            novoContato.getId(),
            novoContato.getCliente().getId(),
            novoContato.getTipo(),
            novoContato.getValor(),
            novoContato.getObservacao()
        );
        
        return ResponseEntity.ok().body(contatoResponse);
    }

    @Operation(summary = "Atualiza um contato", method = "PUT", description = "Função responsável por atualizar um contato")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contato atualizado com sucesso!",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ContatoResponseDTO.class))
        ),

        @ApiResponse(responseCode = "404", description = "Contato não encontrado",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))
        )}),

        @ApiResponse(responseCode = "400", description = "ID inválido",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))    
        )}),
    })
    @PutMapping("/{id}")
    public ResponseEntity<ContatoResponseDTO> atualizar(@PathVariable UUID id, @RequestBody ContatoRequestDTO contato) {
        Contato contatoAtualizado = contatoService.atualizar(id, contato);

        ContatoResponseDTO contatoResponse = new ContatoResponseDTO(
            contatoAtualizado.getId(),
            contatoAtualizado.getCliente().getId(),
            contatoAtualizado.getTipo(),
            contatoAtualizado.getValor(),
            contatoAtualizado.getObservacao()
        );
        
        return ResponseEntity.ok().body(contatoResponse);

    }

    @Operation( summary = "Exclui um contato", method = "DELETE", description = "Função responsável por excluir um contato")
    @ApiResponses( value = {
        @ApiResponse(responseCode = "200", description = "Contato excluído com sucesso",
            content = { @Content(mediaType = "application/json", 
            schema = @Schema(implementation = String.class),
            examples = @ExampleObject(value = "Contato excluído com sucesso!")    
        )}),
        
        @ApiResponse(responseCode = "404", description = "Não foi encontrado nenhum contato com este id",
            content = { @Content(mediaType = "application/json", 
            array = @ArraySchema(schema = @Schema(implementation = ErrorMessageDTO.class))     
        )}),
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<ContatoResponseDTO> deletar(@PathVariable UUID id) {
        contatoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
