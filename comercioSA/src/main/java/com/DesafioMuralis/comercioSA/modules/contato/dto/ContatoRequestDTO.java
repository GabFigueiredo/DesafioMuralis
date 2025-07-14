package com.DesafioMuralis.comercioSA.modules.contato.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ContatoRequestDTO(

    @NotNull(message = "O id do cliente é obrigatório.")
    UUID clientId,

    @NotBlank(message = "O tipo é obrigatório.")
    String tipo,

    @NotBlank(message = "O valor é obrigatório.")
    String valor,

    String observacao

) {}
