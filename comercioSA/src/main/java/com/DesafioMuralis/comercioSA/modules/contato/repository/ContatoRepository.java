package com.DesafioMuralis.comercioSA.modules.contato.repository;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DesafioMuralis.comercioSA.modules.contato.model.Contato;
import com.DesafioMuralis.comercioSA.modules.cliente.model.Cliente;


public interface ContatoRepository extends JpaRepository<Contato, UUID> {
    List<Contato> findByCliente(Cliente cliente);
}