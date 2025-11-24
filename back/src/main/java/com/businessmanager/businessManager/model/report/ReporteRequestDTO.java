package com.businessmanager.businessManager.model.report;

import com.businessmanager.businessManager.enums.Prioridade;

public record ReporteRequestDTO(
    String titulo,
    String descricao,
    String local,
    String data,
    Prioridade prioridade,
    Long userId
) {
    
}
