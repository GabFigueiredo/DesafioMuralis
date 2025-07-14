package com.DesafioMuralis.comercioSA.modules.contato.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DesafioMuralis.comercioSA.exceptions.ResourceNotFoundException;
import com.DesafioMuralis.comercioSA.modules.cliente.model.Cliente;
import com.DesafioMuralis.comercioSA.modules.cliente.service.ClienteService;
import com.DesafioMuralis.comercioSA.modules.contato.dto.ContatoRequestDTO;
import com.DesafioMuralis.comercioSA.modules.contato.model.Contato;
import com.DesafioMuralis.comercioSA.modules.contato.repository.ContatoRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteService clienteService;

    public List<Contato> listarTodos() {
        return contatoRepository.findAll();
    }

    public Contato buscarPorId(UUID id) {
        return contatoRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Contato não encontrado: " + id, "id"));
    }

    public List<Contato> buscarPorIdDoCliente(UUID id) {
        Cliente cliente = clienteService.findById(id);

        List<Contato> contatos = contatoRepository.findByCliente(cliente) ;

        if (contatos.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum contato encontrado para o cliente: " + id, "id");
        }

        return contatos;
    }

    public Contato salvar(ContatoRequestDTO contato) {
        Cliente cliente = clienteService.findById(contato.clientId());

        Contato novoContato = Contato.builder()
            .cliente(cliente)
            .tipo(contato.tipo())
            .valor(contato.valor())
            .observacao(contato.observacao())
            .build();

        return contatoRepository.save(novoContato);
    }

    public Contato atualizar(UUID id, ContatoRequestDTO contato) {
        Contato contatoExistente = this.buscarPorId(id);

        Cliente clienteExiste = clienteService.findById(contato.clientId());

        Contato novoContato = Contato.builder()
            .id(contatoExistente.getId())
            .cliente(clienteExiste)
            .tipo(contato.tipo())
            .valor(contato.valor())
            .observacao(contato.observacao())
            .build();

        return contatoRepository.save(novoContato);
    }


    public void deletar(UUID id) {
        contatoRepository.deleteById(id);
    }



}
