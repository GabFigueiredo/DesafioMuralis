package com.DesafioMuralis.comercioSA.modules.cliente.service;

import com.DesafioMuralis.comercioSA.exceptions.ResourceAlreadyExistsException;
import com.DesafioMuralis.comercioSA.exceptions.ResourceNotFoundException;
import com.DesafioMuralis.comercioSA.modules.cliente.dto.ClientRequestDTO;
import com.DesafioMuralis.comercioSA.modules.cliente.model.Cliente;
import com.DesafioMuralis.comercioSA.modules.cliente.repository.ClienteRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClienteService {


    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente findById(UUID id) {
        return clienteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado com o ID: " + "id", "ID"));
    }

    public Cliente salvar(ClientRequestDTO cliente) {
        Optional<Cliente> clienteExistente =  clienteRepository.findByCpf(cliente.cpf());
        if (clienteExistente.isPresent()) {
            throw new ResourceAlreadyExistsException("Usuário já existe com esse cpf", "CPF");
        }

        Cliente novoCliente = Cliente.builder()
            .nome(cliente.nome())
            .cpf(cliente.cpf())
            .data_nascimento(cliente.data_nascimento())
            .endereco(cliente.endereco())
            .build();

        return clienteRepository.save(novoCliente);
    }

    public Cliente atualizar(UUID id, ClientRequestDTO cliente ) {
        Cliente clienteExistente = this.findById(id);

        // Verifica se o cpf do cliente já existe (não sendo sua versão anterior)        
        boolean cpfJaExiste = clienteRepository.findByCpf(cliente.cpf())
        .filter(client -> !client.getId().equals(id))
        .isPresent();

        if (cpfJaExiste) {
            throw new ResourceAlreadyExistsException("Já existe um usuário com esse cpf", "CPF");
        }

        clienteExistente.setCpf(cliente.cpf());
        clienteExistente.setData_nascimento(cliente.data_nascimento());
        clienteExistente.setNome(cliente.nome());
        clienteExistente.setEndereco(cliente.endereco());

        return clienteRepository.save(clienteExistente);
    }


    public void deletar(UUID id) {
        clienteRepository.deleteById(id);
    }



}
