// UsuarioController.java
package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.Usuario;
import com.example.lc4tp3individual.services.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/usuario")
public class UsuarioController extends BaseControllerImp<Usuario, UsuarioServiceImpl>{

    @Autowired
    private UsuarioServiceImpl usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> optionalUsuario = usuarioService.findByNombreUsuario(usuario.getNombreUsuario());

        if (optionalUsuario.isPresent()) {
            Usuario foundUsuario = optionalUsuario.get();
            try {
                String encryptedPassword = usuarioService.encryptPassword(usuario.getClave());
                if (foundUsuario.getClave().equals(encryptedPassword)) {
                    return ResponseEntity.ok(foundUsuario);
                }
            } catch (NoSuchAlgorithmException e) {
                return ResponseEntity.status(500).body("Error en la encriptación de la contraseña");
            }
        }
        return ResponseEntity.status(401).body("Error. Usuario o Contraseña incorrectos");
    }

    @PostMapping("/registro")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        try {
            Usuario savedUsuario = usuarioService.save(usuario);
            return ResponseEntity.ok(savedUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al registrar el usuario");
        }
    }
}