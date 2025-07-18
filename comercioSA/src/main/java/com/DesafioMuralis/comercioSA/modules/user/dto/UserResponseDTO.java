package com.DesafioMuralis.comercioSA.modules.user.dto;

import java.util.UUID;

public record UserResponseDTO(
    UUID id,     
    String username,
    String password

) 
{}
