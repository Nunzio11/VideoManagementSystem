# Video Management System

Applicazione web sviluppata con **Spring Boot**, **JavaScript** e **MySQL** per la gestione di playlist e video.

## Tecnologie utilizzate

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Bean Validation

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

### Database
- MySQL
---

## Funzionalità

- Registrazione e login utenti
- Creazione, modifica ed eliminazione playlist
- Inserimento, modifica ed eliminazione video
- Visualizzazione playlist e video
- Controllo dei permessi: solo il proprietario può modificare le proprie risorse
- Validazione dei dati lato frontend e backend
- Gestione centralizzata degli errori

---

## Struttura del progetto

```
src
├── controllers
├── services
├── repositories
├── models
├── dto
├── exceptions
```

## Obiettivo del progetto

Questo progetto è stato realizzato a scopo didattico per consolidare le competenze nello sviluppo di applicazioni Java con Spring Boot seguendo un'architettura a livelli (Controller, Service, Repository) e utilizzando DTO, JPA, validazione dei dati e REST API.

## Autore

Nunzio De Falco