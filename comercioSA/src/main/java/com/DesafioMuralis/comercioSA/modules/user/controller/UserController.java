package com.DesafioMuralis.comercioSA.modules.user.controller;

import org.springframework.web.bind.annotation.RestController;

import com.DesafioMuralis.comercioSA.exceptions.ErrorMessageDTO;
import com.DesafioMuralis.comercioSA.modules.user.dto.TokenResponseDTO;
import com.DesafioMuralis.comercioSA.modules.user.dto.UserRequestDTO;
import com.DesafioMuralis.comercioSA.modules.user.dto.UserResponseDTO;
import com.DesafioMuralis.comercioSA.modules.user.model.User;
import com.DesafioMuralis.comercioSA.modules.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@Tag(name = "User")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/user")
    @Operation(summary = "Cadastrar um usuário no sistema", method = "POST", description = "Função responsável por cadastrar um usuário no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuário criado com sucesso", 
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),

        @ApiResponse(responseCode = "404", description = "Valores inválidos para criação de usuário", 
            content = @Content(schema = @Schema(implementation = ErrorMessageDTO.class)))    
    })
    public ResponseEntity<UserResponseDTO> post(@Valid @RequestBody UserRequestDTO userRequest) {
        User newUser = userService.createUser(userRequest);
        
        UserResponseDTO userResponse = new UserResponseDTO(
            newUser.getId(),
            newUser.getUsername(),
            newUser.getPassword()
        );

        return ResponseEntity.ok().body(userResponse);
    }
    
    @PostMapping("/auth/user")
    @Operation(summary = "Gera um token para o usuário", method = "POST", description = "Função responsável gerar um token de login")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sucesso ao validar usuário", 
            content = @Content(schema = @Schema(implementation = TokenResponseDTO.class))),

        @ApiResponse(responseCode = "404", description = "Nome de usuário não encontrado", 
            content = @Content(schema = @Schema(implementation = ErrorMessageDTO.class)))    
    })
    public ResponseEntity<TokenResponseDTO> validate(@Valid @RequestBody UserRequestDTO userRequestDTO) throws AuthenticationException {
        String jwt = userService.validateUser(userRequestDTO);

        TokenResponseDTO response = new TokenResponseDTO(jwt);

        return ResponseEntity.ok().body(response);
    }

}