package org.example.springboot_vms.controllers;

import jakarta.validation.Valid;
import org.example.springboot_vms.dto.VideoRequest;
import org.example.springboot_vms.dto.VideoResponse;
import org.example.springboot_vms.services.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService viService) {
        this.videoService = viService;
    }

    @GetMapping
    public ResponseEntity<List<VideoResponse>> getAllVideos() {
        return ResponseEntity.ok(videoService.findAllVideos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> findVideosById(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.findVideosById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VideoResponse> updateVideos(@PathVariable Long id,@Valid @RequestBody VideoRequest request) {
        return ResponseEntity.ok(videoService.updateVideo(id, request));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideos(@PathVariable Long id, @RequestParam String username) {
        videoService.deleteVideos(id, username);
        return ResponseEntity.noContent().build();

    }
}
