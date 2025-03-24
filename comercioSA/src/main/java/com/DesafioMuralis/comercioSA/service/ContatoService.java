package com.DesafioMuralis.comercioSA.service;

import com.DesafioMuralis.comercioSA.model.Contato;
import com.DesafioMuralis.comercioSA.repository.ContatoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {


    private final ContatoRepository contatoRepository;

    public ContatoService(ContatoRepository contatoRepository) {
        this.contatoRepository = contatoRepository;
    }

    public List<Contato> listarTodos() {
        return contatoRepository.findAll();
    }

    public Optional<Contato> buscarPorId(Integer id) {
        return contatoRepository.findById(id);
    }

    public Contato salvar(Contato contato) {
        return contatoRepository.save(contato);
    }

    public Contato atualizar(Integer id, Contato contato) {
        Optional<Contato> contatoExistente = contatoRepository.findById(id);
        if (contatoExistente.isPresent()) {
            Contato contatoAtualizado = contatoExistente.get();

            // Atualizando os campos do contato com os novos dados
            contatoAtualizado.setTipo(contato.getTipo());
            contatoAtualizado.setObservacao(contato.getObservacao());
            contatoAtualizado.setValor(contato.getValor());

            // Salvando o contato atualizado no banco de dados
            return contatoRepository.save(contatoAtualizado);
        }
        // Caso o contato não seja encontrado, retorna null ou você pode lançar uma exceção
        return null;
    }


    public void deletar(Integer id) {
        contatoRepository.deleteById(id);
    }



}
