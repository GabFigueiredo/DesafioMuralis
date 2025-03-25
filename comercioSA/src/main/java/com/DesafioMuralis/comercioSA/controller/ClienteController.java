package com.DesafioMuralis.comercioSA.controller;

import com.DesafioMuralis.comercioSA.model.Cliente;
import com.DesafioMuralis.comercioSA.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarTodos() {
        try {
            return ResponseEntity.ok(clienteService.listarTodos());
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }

    @PostMapping
    public ResponseEntity<Cliente> salvar(@RequestBody Cliente cliente) {
        try {
            return ResponseEntity.ok(clienteService.salvar(cliente));
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Integer id, @RequestBody Cliente cliente) {
        try {
            return ResponseEntity.ok(clienteService.atualizar(id, cliente));
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        try {
            clienteService.deletar(id);
            return ResponseEntity.noContent().build(); // Retorna 204 se deletado com sucesso
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }
}
