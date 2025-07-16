package com.DesafioMuralis.comercioSA.modules.contato.dto;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContatoResponseDTO(

    UUID id,

    UUID client_id,

    @Schema(example = "Email")
    String tipo,

    @Schema(example = "maria@gmail.com")
    String valor,

    @Schema(example = "Maria só responde em dias de semana")
    String observacao

) {}
