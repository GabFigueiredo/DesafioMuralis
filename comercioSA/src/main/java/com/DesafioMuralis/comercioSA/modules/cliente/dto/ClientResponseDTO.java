package com.DesafioMuralis.comercioSA.modules.cliente.dto;

import java.time.LocalDate;
import java.util.UUID;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClientResponseDTO(
    
    UUID id,
    @Schema(example = "Nelson Schiavi")
    @NotBlank(message = "O nome não pode estar vazio")
    @Length(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    String nome,

    @Schema(example = "11122233344455")
    @NotBlank(message = "O CPF não pode estar vazio")
    @CPF(message = "CPF inválido")
    String cpf,

    @NotNull(message = "A data de nascimento não pode ser nula")
    @Schema(example = "2025-02-03")
    LocalDate data_nascimento,

    @NotBlank(message = "O endereço não pode ser nulo")
    @Length(max = 255, message = "O endereço deve ter no máximo 255 caracteres")
    @Schema(example = "Rua da estiagem sem fim, 91")
    String endereco

) {
    
}
