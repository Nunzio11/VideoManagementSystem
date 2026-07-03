package org.example.springboot_vms.controllers;

import jakarta.validation.Valid;
import org.example.springboot_vms.dto.*;
import org.example.springboot_vms.services.PlaylistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService plService) {
        this.playlistService = plService;
    }

    @GetMapping
    public ResponseEntity<List<PlaylistResponse>> getAllPlaylists() {
        return ResponseEntity.ok(playlistService.findAllPlaylists());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaylistResponse> getPlaylistById(@PathVariable Long id) {
        return ResponseEntity.ok(playlistService.findPlaylistById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlaylistResponse> updatePlaylist(@PathVariable Long id, @Valid @RequestBody PlaylistUpdateRequest request,
                                                           @RequestParam String username) {
        return ResponseEntity.ok(playlistService.updatePlaylist(id, request, username));
    }

    @PostMapping
    public ResponseEntity<PlaylistResponse> createPlaylist(@Valid @RequestBody PlaylistCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body (playlistService.createPlaylist(request));

    }

    @PostMapping("/{id}/videos")
    public ResponseEntity<VideoResponse> addVideoToPlaylist(@PathVariable Long id,
                                                            @Valid @RequestBody VideoRequest request,
                                                            @RequestParam String username) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(playlistService.addVideoToPlaylist(id, request, username));

    }

    @GetMapping("/{id}/videos")
    public ResponseEntity<List<VideoResponse>> getPlaylistVideos(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                playlistService.getPlaylistVideos(id)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id, @RequestParam String username) {
        playlistService.deletePlaylist(id, username);

        return ResponseEntity.noContent().build();
    }

}
