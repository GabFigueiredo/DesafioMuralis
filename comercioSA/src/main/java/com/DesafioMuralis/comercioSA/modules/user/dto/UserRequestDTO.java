package com.DesafioMuralis.comercioSA.modules.user.dto;

import jakarta.validation.constraints.NotBlank;

public record UserRequestDTO(
    @NotBlank(message = "O nome de usuário não pode estar vazio")
    String username,
    
    @NotBlank(message = "A senha não pode estar vazia")
    String password

) 
{}
