package com.DesafioMuralis.comercioSA.repository;

import com.DesafioMuralis.comercioSA.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}