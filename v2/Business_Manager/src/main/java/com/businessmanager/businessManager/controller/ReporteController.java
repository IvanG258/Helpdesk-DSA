package com.businessmanager.businessManager.controller;

import com.businessmanager.businessManager.enums.Prioridade;
import com.businessmanager.businessManager.model.report.ReporteRequestDTO;
import com.businessmanager.businessManager.model.report.ReporteResponseDTO;
import com.businessmanager.businessManager.service.ReporteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @PostMapping
    public ResponseEntity<ReporteResponseDTO> criar(@RequestBody ReporteRequestDTO dto) {
        return ResponseEntity.ok(reporteService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<ReporteResponseDTO>> listar() {
        return ResponseEntity.ok(reporteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReporteResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(reporteService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReporteResponseDTO> atualizar(@PathVariable Long id, @RequestBody ReporteRequestDTO dto) {
        return ResponseEntity.ok(reporteService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        reporteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/prioridade/{prioridade}")
    public ResponseEntity<List<ReporteResponseDTO>> buscarPorPrioridade(@PathVariable Prioridade prioridade) {
        return ResponseEntity.ok(reporteService.buscarPorPrioridade(prioridade));
    }

}
