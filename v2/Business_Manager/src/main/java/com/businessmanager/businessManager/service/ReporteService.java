package com.businessmanager.businessManager.service;

import com.businessmanager.businessManager.enums.Prioridade;
import com.businessmanager.businessManager.model.report.Reporte;
import com.businessmanager.businessManager.model.report.ReporteRequestDTO;
import com.businessmanager.businessManager.model.report.ReporteResponseDTO;
import com.businessmanager.businessManager.model.user.User;
import com.businessmanager.businessManager.repository.ReporteRepository;
import com.businessmanager.businessManager.repository.user.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteService {

    private final ReporteRepository reporteRepository;
    private final UserRepository userRepository;

    public ReporteService(ReporteRepository reporteRepository, UserRepository userRepository) {
        this.reporteRepository = reporteRepository;
        this.userRepository = userRepository;
    }

    // Criar reporte
    public ReporteResponseDTO criar(ReporteRequestDTO dto) {

        User usuario = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Reporte reporte = new Reporte();
        reporte.setTitulo(dto.titulo());
        reporte.setDescricao(dto.descricao());
        reporte.setLocal(dto.local());
        reporte.setData(dto.data());
        reporte.setPrioridade(dto.prioridade());
        reporte.setUsuario(usuario);

        reporteRepository.save(reporte);

        return toResponseDTO(reporte);
    }

    // Listar todos
    public List<ReporteResponseDTO> listarTodos() {
        return reporteRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    // Buscar por ID
    public ReporteResponseDTO buscarPorId(Long id) {
        Reporte reporte = reporteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reporte não encontrado"));

        return toResponseDTO(reporte);
    }

    // Atualizar
    public ReporteResponseDTO atualizar(Long id, ReporteRequestDTO dto) {
        Reporte reporte = reporteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reporte não encontrado"));

        User usuario = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        reporte.setTitulo(dto.titulo());
        reporte.setDescricao(dto.descricao());
        reporte.setLocal(dto.local());
        reporte.setData(dto.data());
        reporte.setUsuario(usuario);

        reporteRepository.save(reporte);

        return toResponseDTO(reporte);
    }

    // Deletar
    public void deletar(Long id) {
        if (!reporteRepository.existsById(id)) {
            throw new RuntimeException("Reporte não encontrado");
        }
        reporteRepository.deleteById(id);
    }

    // Conversão para Record
    private ReporteResponseDTO toResponseDTO(Reporte reporte) {
        return new ReporteResponseDTO(
                reporte.getId(),
                reporte.getTitulo(),
                reporte.getDescricao(),
                reporte.getLocal(),
                reporte.getData(),
                reporte.getPrioridade(),
                reporte.getUsuario().getFullName()
        );
    }

    public List<ReporteResponseDTO> buscarPorPrioridade(Prioridade prioridade) {
    List<Reporte> reportes = reporteRepository.findByPrioridade(prioridade);

    if (reportes.isEmpty()) {
        throw new RuntimeException("Nenhum reporte encontrado com prioridade: " + prioridade);
    }

    return reportes.stream()
            .map(this::toResponseDTO)
            .toList();
}
}
