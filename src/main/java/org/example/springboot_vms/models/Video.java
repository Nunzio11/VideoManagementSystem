package org.example.springboot_vms.models;

import jakarta.persistence.*;

@Entity
@Table(name = "videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "videoID")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "level", nullable = false, length = 50)
    private String level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlistRIF", nullable = false)
    private Playlist playlist;

    @Column(name = "video_url", nullable = false)
    private String videoUrl;

    public Video() {

    }

    public Video(Long id, String title, Integer durationMinutes, String level, Playlist playlist, String videoUrl) {
        super();
        this.id = id;
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.level = level;
        this.playlist = playlist;
        this.videoUrl = videoUrl;
    }

    public Video(String title, Integer durationMinutes, String level, Playlist playlist, String videoUrl) {
        super();
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.level = level;
        this.playlist = playlist;
        this.videoUrl = videoUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
