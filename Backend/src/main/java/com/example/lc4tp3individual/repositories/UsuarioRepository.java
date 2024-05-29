package com.example.lc4tp3individual.repositories;

import com.example.lc4tp3individual.entities.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends BaseRepository<Usuario, Long>{
    @Query("SELECT u FROM Usuario u WHERE u.nombreUsuario = :nombreUsuario")
    Optional<Usuario> findByNombreUsuario(@Param("nombreUsuario") String nombreUsuario);
}