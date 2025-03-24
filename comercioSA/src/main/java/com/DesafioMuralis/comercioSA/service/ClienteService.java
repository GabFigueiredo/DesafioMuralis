package com.DesafioMuralis.comercioSA.service;

import com.DesafioMuralis.comercioSA.model.Cliente;
import com.DesafioMuralis.comercioSA.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {


    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorId(Integer id) {
        return clienteRepository.findById(id);
    }

    public Cliente salvar(Cliente cliente) {

        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Integer id, Cliente cliente) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);
        if (clienteExistente.isPresent()) {
            Cliente clienteAtualizado = clienteExistente.get();

            // Atualizando os campos do cliente com os novos dados
            clienteAtualizado.setNome(cliente.getNome());
            clienteAtualizado.setCpf(cliente.getCpf());
            clienteAtualizado.setData_nascimento(cliente.getData_nascimento());
            clienteAtualizado.setEndereco(cliente.getEndereco());

            // Salvando o cliente atualizado no banco de dados
            return clienteRepository.save(clienteAtualizado);
        }
        // Caso o cliente não seja encontrado, retorna null ou você pode lançar uma exceção
        return null;
    }


    public void deletar(Integer id) {
        clienteRepository.deleteById(id);
    }



}
