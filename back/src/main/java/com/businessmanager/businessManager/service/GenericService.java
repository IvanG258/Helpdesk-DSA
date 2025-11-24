package com.businessmanager.businessManager.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;
/**
 * Interface genérica base para todos os serviços.
 * T -> Entidade
 * Req -> DTO de requisição
 * Res -> DTO de resposta
 */
public interface GenericService<T, Req, Res> {

    Res criar(Req dto);

    Optional<Res> buscarPorId(Long id);

    Page<Res> listarTodos(Pageable pageable);

    Res atualizar(Long id, Req dto);

    void deletar(Long id);
}