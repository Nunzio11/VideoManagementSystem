checkLogin();

const params = new URLSearchParams(window.location.search);
const playlistId = params.get("playlistId");

let selectedVideoId = null;
let isPlaylistOwner = false;
let currentlyPlayingId = null;

initPage();

async function initPage() {
    await loadPlaylist();
    await loadVideos();
}

function validateVideo(video) {
    if (!video.title || video.title.trim().length === 0) {
        showError("Il titolo del video non può essere vuoto");
        return false;
    }

    // BLOCCA NUMERI E CARATT. SPECIALI
    const validPattern = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ ]+$/;
    if (!validPattern.test(video.title)) {
        showError("Il titolo del video può contenere solo lettere e spazi");
        return false;
    }

    if (video.title.trim().length < 7 || video.title.trim().length > 255) {
        showError("Il titolo deve contenere tra i 7 e i 255 caratteri");
        return false;
    }

    if (isNaN(video.durationMinutes) || video.durationMinutes < 1) {
        showError("La durata deve essere almeno di 1 minuto");
        return false;
    }

    if (video.durationMinutes > 240) {
        showError("La durata non può superare le 4 ore (240 minuti)");
        return false;
    }

    const validLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
    if (!validLevels.includes(video.level)) {
        showError("Il livello selezionato non è valido!");
        return false;
    }

    if (!video.videoUrl || video.videoUrl.trim().length === 0) {
        showError("L'URL del video o il File Path non può essere vuoto");
        return false;
    }

    return true;
}

async function loadPlaylist() {
    try {
        const playlist = await getPlaylist(playlistId);
        const loggedUser = sessionStorage.getItem("loggedUser");

        if (loggedUser) {
            document.getElementById("user-greeting").innerHTML = "Ciao, " + loggedUser;
        }

        isPlaylistOwner = playlist.username === loggedUser;

        document.getElementById("playlist-title").innerHTML = playlist.title;
        document.getElementById("playlist-author").innerHTML = "Autore: " + playlist.author;
        document.getElementById("playlist-category").innerHTML = "Categoria: " + playlist.category;

        const newVideoBtn = document.getElementById("btn-new-video");
        if(newVideoBtn) {
            newVideoBtn.disabled = !isPlaylistOwner;
        }

    } catch (error) {
        showError(error.message);
    }
}

async function loadVideos() {
    try {
        const videos = await getPlaylistVideos(playlistId);
        const table = document.getElementById("video-table");

        table.innerHTML = "";

        videos.forEach(video => {
            table.innerHTML += `
            <tr>
                <td>
                    <span style="cursor: pointer; color: #0d6efd; font-weight: 500;" onclick="playVideo(${video.id})">
                        ▶️ ${video.title}
                    </span>
                </td>
                <td>${video.durationMinutes} min</td>
                <td>${video.level}</td>
                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editVideo(${video.id})"
                        ${!isPlaylistOwner ? 'disabled' : ''}>
                        ✏️
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteVideo(${video.id})"
                        ${!isPlaylistOwner ? 'disabled' : ''}>
                        🗑️
                    </button>
                </td>
            </tr>
            `;
        });

    } catch (error) {
        showError(error.message);
    }
}

function convertToYouTubeEmbed(url) {
    if (!url) return "";

    if (url.includes("youtube.com/embed/")) {
        return url.includes("?") ? `${url}&rel=0` : `${url}?rel=0`;
    }

    if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return `https://www.youtube.com/embed/${urlParams.get('v')}?rel=0`;
    }

    if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?rel=0`;
    }

    return url;
}

async function playVideo(id) {
    try {
        const video = await getVideo(id);


        currentlyPlayingId = id;

        const container = document.getElementById("video-player-container");
        const player = document.getElementById("main-video-player");
        const titleElement = document.getElementById("player-video-title");
        const detailsElement = document.getElementById("player-video-details");
        const currentVideoTxt = document.getElementById("player-current-video");

        titleElement.innerText = video.title;
        detailsElement.innerText = `Livello: ${video.level} - Durata: ${video.durationMinutes} min`;

        if (currentVideoTxt) {
            currentVideoTxt.innerText = video.title;
        }

        player.src = convertToYouTubeEmbed(video.videoUrl);

        container.classList.remove("d-none");
        container.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        showError("Impossibile riprodurre il video: " + error.message);
    }
}

async function saveVideo() {
    if(!isPlaylistOwner) {
        showError("Azione non consentita: Non sei il proprietario di questa playlist!");
        closeModal("insertVideoModal");
        return;
    }

    const titleInput = document.getElementById("video-title").value;
    const durationInput = document.getElementById("video-duration").value;
    const urlInput = document.getElementById("video-url").value;

    if (titleInput.trim() === "" || durationInput.trim() === "" || urlInput.trim() === "") {
        showError("Tutti i campi obbligatori devono essere compilati");
        return;
    }

    const loggedUser = sessionStorage.getItem("loggedUser");

    const video = {
        title: titleInput,
        durationMinutes: parseInt(durationInput),
        level: document.getElementById("video-level").value,
        videoUrl: urlInput,
        username: loggedUser
    };

    if (!validateVideo(video)) {
        return;
    }

    try {
        video.title = video.title.trim();
        video.videoUrl = video.videoUrl.trim();

        await createVideo(playlistId, video, loggedUser);

        showSuccess("Video creato con successo");
        closeModal("insertVideoModal");
        clearInputs("video-title", "video-duration", "video-url");
        loadVideos();

    } catch (error) {
        showError(error.message);
    }
}

async function editVideo(id) {
    selectedVideoId = id;
    const video = await getVideo(id);

    document.getElementById("upd-video-title").value = video.title;
    document.getElementById("upd-video-duration").value = video.durationMinutes;
    document.getElementById("upd-video-level").value = video.level;
    document.getElementById("upd-video-url").value = video.videoUrl;

    openModal("updateVideoModal");
}

async function saveVideoUpdate() {
    const titleInput = document.getElementById("upd-video-title").value;
    const durationInput = document.getElementById("upd-video-duration").value;
    const urlInput = document.getElementById("upd-video-url").value;

    if (titleInput.trim() === "" || durationInput.trim() === "" || urlInput.trim() === "") {
        showError("Tutti i campi obbligatori devono essere compilati");
        return;
    }

    const video = {
        title: titleInput,
        durationMinutes: parseInt(durationInput),
        level: document.getElementById("upd-video-level").value,
        videoUrl: urlInput,
        username: sessionStorage.getItem("loggedUser")
    };

    if (!validateVideo(video)) {
       return;
    }

    try {
        video.title = video.title.trim();
        video.videoUrl = video.videoUrl.trim();

        await updateVideoService(selectedVideoId, video);

        showSuccess("Video aggiornato");
        closeModal("updateVideoModal");
        loadVideos();

    } catch (error) {
        showError(error.message);
    }
}

async function deleteVideo(id) {
    const result = await Swal.fire({
        title: 'Sei sicuro?',
        text: "Non potrai recuperare questo video!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sì, eliminala!',
        cancelButtonText: 'Annulla'
    });

    if (result.isConfirmed) {
        try {
            await deleteVideoService(id);
            showSuccess("Video eliminato con successo");


            if (id === currentlyPlayingId) {
                const container = document.getElementById("video-player-container");
                const player = document.getElementById("main-video-player");
                const currentVideoTxt = document.getElementById("player-current-video");

                if (container) container.classList.add("d-none");
                if (player) player.src = "";
                if (currentVideoTxt) currentVideoTxt.innerText = "";

                currentlyPlayingId = null; // Reset dello stato
            }

            loadVideos();
        } catch (error) {
            showError(error.message);
        }
    }
}