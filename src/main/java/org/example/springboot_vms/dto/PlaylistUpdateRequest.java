package org.example.springboot_vms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PlaylistUpdateRequest(

        @NotBlank(message = "Il titolo è obbligatorio")
        @Size(min = 6, max = 50, message = "Il titolo deve contenere tra 6 e 50 caratteri")
        @Pattern(regexp = "^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ ]+$",
        message = "Il titolo può contenere solo lettere e spazi")
        String title,

        @NotBlank(message = "La categoria è obbligatoria")
        @Size(min = 3, max = 50, message = "La categoria deve contenere tra 3 e 50 caratteri")
        @Pattern(regexp = "^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ ]+$",
        message = "La categoria può contenere solo lettere e spazi")
        String category

) {
}