package com.DesafioMuralis.comercioSA.modules.contato.dto;

import java.util.UUID;

public record ContatoResponseDTO(

    UUID id,

    UUID client_id,

    String tipo,

    String valor,

    String observacao

) {}
