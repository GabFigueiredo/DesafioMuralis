package com.DesafioMuralis.comercioSA.controller;

import com.DesafioMuralis.comercioSA.model.Contato;
import com.DesafioMuralis.comercioSA.service.ContatoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    private ContatoService contatoService;

    public ContatoController(ContatoService contatoService) {
        this.contatoService = contatoService;
    }

    @GetMapping
    public ResponseEntity<List<Contato>> listarTodos() {
        try {
            return ResponseEntity.ok(contatoService.listarTodos());
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }

    @PostMapping
    public ResponseEntity<Contato> salvar(@RequestBody Contato contato) {
        try {
            return ResponseEntity.ok(contatoService.salvar(contato));
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contato> atualizar(@PathVariable Integer id, @RequestBody Contato contato) {
        try {
            return ResponseEntity.ok(contatoService.atualizar(id, contato));
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        try {
            contatoService.deletar(id);
            return ResponseEntity.noContent().build(); // Retorna 204 se deletado com sucesso
        } catch (Exception e) {
            System.out.println("Ocorreu um erro inesperado: " + e.getMessage());
            return ResponseEntity.badRequest().build(); // Retorna 400 em caso de erro
        }
    }
}
