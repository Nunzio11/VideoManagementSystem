package org.example.springboot_vms.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "playlists")
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "playlistid")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "category", nullable = false, length = 255)
    private String category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "playlist", fetch = FetchType.LAZY)
    private List<Video> videos = new ArrayList<>();

    public Playlist() {

    }

    public Playlist(Long id, String title, String category, User user, List<Video> videos) {
        super();
        this.id = id;
        this.title = title;
        this.category = category;
        this.user = user;
        this.videos = videos;
    }

    public Playlist(String title, String category, User user, List<Video> videos) {
        super();
        this.title = title;
        this.category = category;
        this.user = user;
        this.videos = videos;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Video> getVideos() {
        return videos;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }
}
