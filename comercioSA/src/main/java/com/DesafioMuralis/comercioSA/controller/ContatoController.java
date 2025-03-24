package com.DesafioMuralis.comercioSA.controller;

import com.DesafioMuralis.comercioSA.model.Contato;
import com.DesafioMuralis.comercioSA.service.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Contato> listarTodos() {
        return contatoService.listarTodos();
    }

    @PostMapping
    public Contato salvar(@RequestBody Contato cliente) {
        return contatoService.salvar(cliente);
    }

    @PutMapping("/{id}")
    public Contato atualizar(@PathVariable Integer id, @RequestBody Contato cliente) {
        return contatoService.atualizar(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        contatoService.deletar(id);
    }
}
