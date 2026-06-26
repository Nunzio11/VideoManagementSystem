package org.example.springboot_vms.dto;

import java.util.List;

public record PlaylistResponse(
        Long id,
        String title,
        String category,
        String author,
        String username,
        List<VideoResponse> videos) {
};
