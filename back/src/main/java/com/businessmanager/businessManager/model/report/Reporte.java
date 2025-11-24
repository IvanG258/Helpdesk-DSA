package com.businessmanager.businessManager.model.report;

import com.businessmanager.businessManager.enums.Prioridade;
import com.businessmanager.businessManager.model.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "Reporte")
@Entity
public class Reporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String titulo;
    private String descricao;
    private String local;
    private String data;
    private Prioridade prioridade;

   @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User usuario;
    
}
