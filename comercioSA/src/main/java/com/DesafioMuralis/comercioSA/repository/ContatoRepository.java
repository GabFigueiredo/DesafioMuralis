package com.DesafioMuralis.comercioSA.repository;

import com.DesafioMuralis.comercioSA.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}