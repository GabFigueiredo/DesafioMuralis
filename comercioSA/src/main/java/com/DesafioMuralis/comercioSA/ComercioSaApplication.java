package com.DesafioMuralis.comercioSA;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Desafio Muralis", description = "API responsável do desafio"))
public class ComercioSaApplication {
	public static void main(String[] args) {
		SpringApplication.run(ComercioSaApplication.class, args);
	}

}
