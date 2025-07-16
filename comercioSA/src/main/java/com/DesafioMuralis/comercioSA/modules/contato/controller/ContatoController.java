package com.DesafioMuralis.comercioSA.modules.contato.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DesafioMuralis.comercioSA.modules.contato.dto.ContatoRequestDTO;
import com.DesafioMuralis.comercioSA.modules.contato.dto.ContatoResponseDTO;
import com.DesafioMuralis.comercioSA.modules.contato.model.Contato;
import com.DesafioMuralis.comercioSA.modules.contato.service.ContatoService;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<ContatoResponseDTO> deletar(@PathVariable UUID id) {
        contatoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
