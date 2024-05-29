// UsuarioServiceImpl.java
package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.Usuario;
import com.example.lc4tp3individual.repositories.BaseRepository;
import com.example.lc4tp3individual.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UsuarioServiceImpl extends BaseServiceImp<Usuario, Long> implements UsuarioService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(BaseRepository<Usuario, Long> baseRepository, UsuarioRepository usuarioRepository){
        super(baseRepository);
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<Usuario> findByNombreUsuario(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }

    @Override
    public Usuario save(Usuario entity) throws Exception {
        try {
            // Encriptar la clave antes de guardar
            entity.setClave(encryptPassword(entity.getClave()));
            return super.save(entity);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public String encryptPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes());
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if(hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}