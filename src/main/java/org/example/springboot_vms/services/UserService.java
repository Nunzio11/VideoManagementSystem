package org.example.springboot_vms.services;

import org.example.springboot_vms.models.User;
import org.example.springboot_vms.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User login(String username, String password) {
        User user = repository.findByUsername(username).orElse(null);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }

    public User register(User user) {
        String username = user.getUsername().trim().toLowerCase();

        if (repository.findByUsername(username).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username già esistente!");
        }
        user.setUsername(username);

        return repository.save(user);
    }
}