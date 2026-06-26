package org.example.springboot_vms.repositories;

import org.example.springboot_vms.models.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByPlaylistId(Long playlistId);
}
