package org.example.springboot_vms.dto;


public record VideoResponse(
        Long id,
        String title,
        Integer durationMinutes,
        String level) {
};






