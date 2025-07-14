package com.DesafioMuralis.comercioSA.modules.cliente.controller;

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

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ContatoService contatoService;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable UUID id) {
        clienteService.deletar(id);
        return ResponseEntity.ok().body("Cliente excluído com sucesso!");
    }
}
