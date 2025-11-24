package com.businessmanager.businessManager.model.report;

import com.businessmanager.businessManager.enums.Prioridade;

public record ReporteResponseDTO(
    Long id,
    String titulo,
    String descricao,
    String local,
    String data,
    Prioridade prioridade,
    String nomeUsuario
) {
    
}
