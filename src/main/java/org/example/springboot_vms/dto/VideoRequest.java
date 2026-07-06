package org.example.springboot_vms.dto;

import jakarta.validation.constraints.*;

public record VideoRequest(
        @NotBlank(message = "Il titolo è obbligatorio")
        @Size(min = 7, max = 255, message = "Il titolo deve contenere tra 7 e 255 caratteri")
        @Pattern(regexp = "^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ ]+$",
        message = "Il titolo del video può contenere solo lettere e spazi")
        String title,


        @Min(value = 1, message = "La durata deve essere maggiore di 0")
        @Max(value = 14400, message = "La durata non può superare i 14400 secondi")
        Integer durationMinutes,

        @NotBlank(message = "Il livello è obbligatorio")
        @Pattern(regexp = "BEGINNER|INTERMEDIATE|ADVANCED", message = "Il livello deve essere uno tra: BEGINNER, INTERMEDIATE, ADVANCED")
        @Size(max = 50, message = "Livello non valido")
        String level,

        @NotBlank(message = "Utente obbligatorio")
        String username

) {
};
