package org.example.springboot_vms.dto;

import org.example.springboot_vms.models.Video;

public class VideoMapper {
    private VideoMapper() {

    }

    public static VideoResponse toVideoResponse(Video video) {

        return new VideoResponse(
                video.getId(),
                video.getTitle(),
                video.getDurationMinutes(),
                video.getLevel(),
                video.getVideoUrl()
        );
    }
}

