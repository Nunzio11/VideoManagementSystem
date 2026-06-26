DROP
DATABASE IF EXISTS spring_api_vms;
CREATE
DATABASE spring_api_vms;
USE
spring_api_vms;

CREATE TABLE users
(
    userid     BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    username   VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL
);

CREATE TABLE playlists
(
    playlistid BIGINT PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(255) NOT NULL,
    category   VARCHAR(255) NOT NULL,
    user_id    BIGINT       NOT NULL,
    CONSTRAINT fk_playlist_user
        FOREIGN KEY (user_id) REFERENCES users (userid) ON DELETE CASCADE
);

CREATE TABLE videos
(
    videoid          BIGINT PRIMARY KEY AUTO_INCREMENT,
    title            VARCHAR(255) NOT NULL,
    duration_minutes INTEGER      NOT NULL,
    level            VARCHAR(50) CHECK (level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
    playlistrif      BIGINT       NOT NULL,
    CONSTRAINT fk_videos_playlist
        FOREIGN KEY (playlistrif) REFERENCES playlists (playlistid) ON DELETE CASCADE
);


INSERT INTO users(first_name, last_name, username, password)
VALUES ('Mario', 'Rossi', 'admin', 'admin123'),
       ('Giulia', 'Bianchi', 'giulia', 'pass1234'),
       ('Luca', 'Verdi', 'luca', 'pass1234'),
       ('Anna', 'Ferrari', 'anna', 'pass1234'),
       ('Paolo', 'Romano', 'paolo', 'pass1234');


INSERT INTO playlists(title, category, user_id)
VALUES ('Spring Boot Fundamentals', 'Backend Development', 1),
       ('REST API Mastery', 'Web Services', 2),
       ('Spring Security Complete Guide', 'Security', 3),
       ('Microservices with Spring Cloud', 'Architecture', 4),
       ('Advanced Spring Data JPA', 'Database', 5);


INSERT INTO videos(title, duration_minutes, level, playlistrif)
VALUES ('Introduction to Spring Boot', 15, 'BEGINNER', 1),
       ('Project Setup with Maven', 20, 'BEGINNER', 1),
       ('Dependency Injection Explained', 25, 'INTERMEDIATE', 1),

       ('What is a REST API?', 18, 'BEGINNER', 2),
       ('Building CRUD Endpoints', 30, 'INTERMEDIATE', 2),
       ('Exception Handling Best Practices', 22, 'ADVANCED', 2),

       ('Spring Security Basics', 20, 'BEGINNER', 3),
       ('JWT Authentication', 35, 'INTERMEDIATE', 3),
       ('Role-Based Access Control', 28, 'ADVANCED', 3),

       ('Introduction to Microservices', 25, 'BEGINNER', 4),
       ('Service Discovery with Eureka', 32, 'INTERMEDIATE', 4),
       ('API Gateway Configuration', 40, 'ADVANCED', 4),

       ('Getting Started with JPA', 18, 'BEGINNER', 5),
       ('Entity Relationships', 27, 'INTERMEDIATE', 5),
       ('Performance Optimization with Hibernate', 38, 'ADVANCED', 5);


SELECT *
FROM users;
SELECT *
FROM videos;
SELECT *
FROM playlists;
