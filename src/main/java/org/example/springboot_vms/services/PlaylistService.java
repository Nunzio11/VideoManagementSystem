package org.example.springboot_vms.services;

import jakarta.transaction.Transactional;
import org.example.springboot_vms.dto.*;
import org.example.springboot_vms.models.Playlist;
import org.example.springboot_vms.models.User;
import org.example.springboot_vms.models.Video;
import org.example.springboot_vms.repositories.PlaylistRepository;
import org.example.springboot_vms.repositories.UserRepository;
import org.example.springboot_vms.repositories.VideoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    public PlaylistService(PlaylistRepository pRepo, VideoRepository vRepo, UserRepository uRepo) {
        this.playlistRepository = pRepo;
        this.videoRepository = vRepo;
        this.userRepository = uRepo;
    }


    @Transactional
    public List<PlaylistResponse> findAllPlaylists() {

        return playlistRepository.findAll()
                .stream()
                .map(PlaylistMapper::toPlaylistResponse)
                .toList();
    }

    @Transactional
    public PlaylistResponse createPlaylist(PlaylistCreateRequest request) {

        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));

        if (playlistRepository.existsByTitleAndUserUsername(request.title(), request.username())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hai già una playlist con questo titolo!");
        }

        Playlist pl = new Playlist();
        pl.setTitle(request.title());
        pl.setCategory(request.category());
        pl.setUser(user);

        Playlist saved = playlistRepository.save(pl);

        return PlaylistMapper.toPlaylistResponse(saved);
    }

    @Transactional
    public PlaylistResponse findPlaylistById(Long id) {

        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Playlist not found with id: " + id));

        return PlaylistMapper.toPlaylistResponse(playlist);
    }

    @Transactional
    public VideoResponse addVideoToPlaylist(Long playlistId, VideoRequest request, String username) {

        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Playlist not found with id: " + playlistId));

        if (!playlist.getUser().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Non puoi aggiungere video a una playlist che non ti appartiene!");
        }

        Video v = new Video();
        v.setTitle(request.title());
        v.setDurationMinutes(request.durationMinutes());
        v.setLevel(request.level());
        v.setVideoUrl(request.videoUrl());
        v.setPlaylist(playlist);

        Video saved = videoRepository.save(v);

        return VideoMapper.toVideoResponse(saved);
    }

    @Transactional
    public PlaylistResponse updatePlaylist(Long id, PlaylistUpdateRequest request, String username) {

        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Playlist not found with id: " + id));

        if (!playlist.getUser().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Non sei autorizzato!");
        }

        if (!playlist.getTitle().equals(request.title())
                && playlistRepository.existsByTitleAndUserUsername(request.title(), username)) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hai già una playlist con questo titolo");
        }

        playlist.setTitle(request.title());
        playlist.setCategory(request.category());

        Playlist saved = playlistRepository.save(playlist);

        return PlaylistMapper.toPlaylistResponse(saved);
    }

    @Transactional
    public void deletePlaylist(Long id, String username) {
        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found with id: " + id));

        if (!playlist.getUser().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Non puoi eliminare una playlist che non ti appartiene!");
        }
        playlistRepository.delete(playlist);
    }

    @Transactional
    public List<VideoResponse> getPlaylistVideos(Long id) {

        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Playlist not found with id: " + id));

        return playlist.getVideos()
                .stream()
                .map(VideoMapper::toVideoResponse)
                .toList();
    }
}