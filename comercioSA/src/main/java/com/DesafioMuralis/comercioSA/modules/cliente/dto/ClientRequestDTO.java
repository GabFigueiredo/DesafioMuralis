package com.DesafioMuralis.comercioSA.modules.cliente.dto;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClientRequestDTO(

    @NotBlank(message = "O nome não pode estar vazio")
    @Length(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    String nome,

    @NotBlank(message = "O CPF não pode estar vazio")
    @CPF(message = "CPF inválido")
    String cpf,

    @NotNull(message = "A data de nascimento não pode ser nula")
    LocalDate data_nascimento,

    @NotBlank(message = "O endereço não pode ser nulo")
    @Length(max = 255, message = "O endereço deve ter no máximo 255 caracteres")
    String endereco

) {}
