package org.example.springboot_vms.repositories;

import org.example.springboot_vms.models.Playlist;
import org.example.springboot_vms.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    List<Playlist> findByUser(User user);

    boolean existsByTitleAndUserUsername(String title, String username);
}
