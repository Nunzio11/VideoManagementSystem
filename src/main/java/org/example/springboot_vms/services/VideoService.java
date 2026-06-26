package org.example.springboot_vms.services;

import jakarta.transaction.Transactional;
import org.example.springboot_vms.dto.VideoMapper;
import org.example.springboot_vms.dto.VideoRequest;
import org.example.springboot_vms.dto.VideoResponse;
import org.example.springboot_vms.models.Video;
import org.example.springboot_vms.repositories.PlaylistRepository;
import org.example.springboot_vms.repositories.VideoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class VideoService {


    private final VideoRepository videoRepository;
    private final PlaylistRepository playlistRepository;

    public VideoService(VideoRepository vRepo, PlaylistRepository pRepo) {
        this.videoRepository = vRepo;
        this.playlistRepository = pRepo;

    }

    private void checkVideoOwner(Video video, String username) {
        if (!video.getPlaylist().getUser().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Non puoi modificare o eliminare i video di un altro utente!");
        }
    }


    @Transactional
    public List<VideoResponse> findAllVideos() {
        return videoRepository.findAll()
                .stream()
                .map(VideoMapper::toVideoResponse)
                .toList();
    }

    @Transactional
    public VideoResponse findVideosById(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found with id: " + id));

        return VideoMapper.toVideoResponse(video);
    }


    @Transactional
    public VideoResponse updateVideo(Long id, VideoRequest request) {

        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found with id: " + id));

        checkVideoOwner(video, request.username());

        video.setTitle(request.title());
        video.setDurationMinutes(request.durationMinutes());
        video.setLevel(request.level());

        Video saveVideo = videoRepository.save(video);
        return VideoMapper.toVideoResponse(saveVideo);

    }

    @Transactional
    public void deleteVideos(Long id, String username) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found with id: " + id));

        checkVideoOwner(video, username);
        videoRepository.delete(video);

    }
}
