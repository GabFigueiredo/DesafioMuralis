package com.DesafioMuralis.comercioSA.modules.contato.model;

import java.util.UUID;

import com.DesafioMuralis.comercioSA.modules.cliente.model.Cliente;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contato {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Cliente cliente;

    private String tipo;
    private String valor;
    private String observacao;

}
