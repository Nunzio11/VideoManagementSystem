package org.example.springboot_vms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank(message = "Il nome è obbligatorio")
        @Pattern(regexp =  "^[A-Z][a-z]+$", message = "Il nome deve iniziare con la lettera maiuscola")
        String firstName,


        @NotBlank(message = "Il cognome è obbligatorio")
        @Pattern(regexp =  "^[A-Z][a-z]+$", message = "Il cognome deve iniziare con la lettera maiuscola")
        String lastName,

        @NotBlank(message = "Lo username è obbligatorio")
        @Size(min = 4, max = 20, message = "Lo username deve contenere tra 4 e 20 caratteri")
        @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Lo username contiene caratteri non consentiti")
        String username,


        @NotBlank(message = "La password è obbligatoria")
        @Size(min = 8, message = "La password deve contenere almeno 8 caratteri")
        @Pattern(regexp =  "^(?=.*[A-Z]).{8,}$", message = "La password deve contenere almeno una lettera maiuscola" )
        String password
) {
}
