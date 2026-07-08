package org.example.springboot_vms.controllers;

import jakarta.validation.Valid;
import org.example.springboot_vms.dto.LoginRequest;
import org.example.springboot_vms.dto.LoginResponse;
import org.example.springboot_vms.dto.RegisterRequest;
import org.example.springboot_vms.models.User;
import org.example.springboot_vms.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final UserService service;

    public LoginController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        User user = service.login(
                request.username(),
                request.password()
        );

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Credenziali non valide"));
        }

        return ResponseEntity.ok(
                new LoginResponse("Login effettuato")
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

        User user = new User();

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setUsername(request.username());
        user.setPassword(request.password());

        service.register(user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Utente registrato con successo!");

    }
}

