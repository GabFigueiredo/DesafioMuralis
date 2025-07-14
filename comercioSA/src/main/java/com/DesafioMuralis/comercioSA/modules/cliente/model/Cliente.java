package com.DesafioMuralis.comercioSA.modules.cliente.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.DesafioMuralis.comercioSA.modules.contato.model.Contato;

@Entity
@Table(name = "cliente")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 100) 
    private String nome;

    @Column(nullable = false, length = 14) 
    private String cpf;

    @Column(name = "data_nascimento", nullable = true) 
    private LocalDate data_nascimento;

    @Column(nullable = true, length = 255)
    private String endereco;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Contato> contatos = new ArrayList<>();

}
