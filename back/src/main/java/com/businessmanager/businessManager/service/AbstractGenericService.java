package com.businessmanager.businessManager.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public abstract class AbstractGenericService<T, Req, Res> implements GenericService<T, Req, Res> {

    @Override
    public Res criar(Req dto) {
        throw new UnsupportedOperationException("Método não implementado");
    }

    @Override
    public Optional<Res> buscarPorId(Long id) {
        throw new UnsupportedOperationException("Método não implementado");
    }

    @Override
    public Page<Res> listarTodos(Pageable pageable) {
        throw new UnsupportedOperationException("Método não implementado");
    }

    @Override
    public Res atualizar(Long id, Req dto) {
        throw new UnsupportedOperationException("Método não implementado");
    }

    @Override
    public void deletar(Long id) {
        throw new UnsupportedOperationException("Método não implementado");
    }
}