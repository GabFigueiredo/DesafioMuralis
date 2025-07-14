package com.DesafioMuralis.comercioSA.modules.cliente.repository;

import com.DesafioMuralis.comercioSA.modules.cliente.model.Cliente;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ClienteRepository extends JpaRepository<Cliente, UUID> {
    Optional<Cliente> findByCpf(String cpf);
}