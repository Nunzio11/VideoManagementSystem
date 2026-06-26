package org.example.springboot_vms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PlaylistCreateRequest(

        @NotBlank(message = "Il titolo è obbligatorio")
        @Size(min = 6, max = 50, message = "Il titolo deve contenere tra i 6 e 50 caratteri")
        String title,


        @NotBlank(message = "La categoria è obbligatoria")
        @Size(min = 3, max = 50, message = "La categoria deve contenere tra i 3 e 50 caratteri")
        String category,
        
        String username
) {
}
