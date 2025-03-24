package com.DesafioMuralis.comercioSA.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;

@Entity
@Table(name = "Cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @Column(nullable = false, length = 100)  // Para o campo nome varchar(100)
    private String nome;

    @Column(nullable = false, length = 14)  // Para o campo cpf varchar(14)
    private String cpf;

    @Column(name = "data_nascimento", nullable = true)  // Para o campo data_nascimento DATE
    private LocalDate data_nascimento;

    @Column(nullable = true, length = 255)  // Para o campo endereco varchar(255)
    private String endereco;


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getData_nascimento() {
        return data_nascimento;
    }

    public void setData_nascimento(LocalDate data_nascimento) {
        this.data_nascimento = data_nascimento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}



