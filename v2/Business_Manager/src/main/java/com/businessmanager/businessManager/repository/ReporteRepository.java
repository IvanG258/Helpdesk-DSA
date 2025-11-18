package com.businessmanager.businessManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.businessmanager.businessManager.enums.Prioridade;
import com.businessmanager.businessManager.model.report.Reporte;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findByPrioridade(Prioridade prioridade);
}
