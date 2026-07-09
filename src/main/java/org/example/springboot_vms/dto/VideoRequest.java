package org.example.springboot_vms.dto;

import jakarta.validation.constraints.*;

public record VideoRequest(
        @NotBlank(message = "Il titolo è obbligatorio")
        @Size(min = 6, max = 255, message = "Il titolo deve contenere tra 6 e 255 caratteri")
        @Pattern(regexp = "^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ][a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ\\s\\-_.,!?()']*$",
                message = "Il titolo contiene caratteri non validi")
        String title,

        @Min(value = 1, message = "La durata deve essere maggiore di 0")
        @Max(value = 14400, message = "La durata non può superare i 14400 secondi")
        Integer durationMinutes,

        @NotBlank(message = "Il livello è obbligatorio")
        @Pattern(regexp = "BEGINNER|INTERMEDIATE|ADVANCED", message = "Il livello deve essere uno tra: BEGINNER, INTERMEDIATE, ADVANCED")
        @Size(max = 50, message = "Livello non valido")
        String level,

        @NotBlank(message = "Utente obbligatorio")
        String username,

        @NotBlank(message = "L'URL del video è obbligatorio")
        @Pattern(regexp = "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?.*$",
                message = "Inserisci un URL valido (es. https://...)")
        String videoUrl
) {}