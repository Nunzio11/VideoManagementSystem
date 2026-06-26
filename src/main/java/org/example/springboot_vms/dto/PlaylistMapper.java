package org.example.springboot_vms.dto;

import org.example.springboot_vms.models.Playlist;

import java.util.List;

public class PlaylistMapper {
    private PlaylistMapper() {

    }

    public static PlaylistResponse toPlaylistResponse(Playlist playlist) {

        //Dettaglio dei video
        List<VideoResponse> videos = playlist.getVideos()
                .stream()
                .map(VideoMapper::toVideoResponse)
                .toList();


        return new PlaylistResponse(
                playlist.getId(),
                playlist.getTitle(),
                playlist.getCategory(),
                playlist.getUser().getFirstName() + " " + playlist.getUser().getLastName(),
                playlist.getUser().getUsername(),
                videos
        );
    }
}
