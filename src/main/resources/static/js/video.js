checkLogin();

const params = new URLSearchParams(window.location.search);
const playlistId = params.get("playlistId");

let selectedVideoId = null;
let isPlaylistOwner = false;

initPage();

async function initPage() {
    await loadPlaylist();
    await loadVideos();
}

function validateVideo(video) {
    if (!video.title || video.title.trim().length === 0) {
        alert("Il titolo del video non può essere vuoto");
        return false;
    }

    // BLOCCA NUMERI E CARATT. SPECIALI
    const validPattern = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ ]+$/;
    if (!validPattern.test(video.title)) {
        alert("Il titolo del video può contenere solo lettere e spazi");
        return false;
    }

    if (video.title.trim().length < 7 || video.title.trim().length > 255) {
            alert("Il titolo deve contenere tra i 7 e i 255 caratteri");
            return false;
    }

    if (isNaN(video.durationMinutes) || video.durationMinutes < 1) {
        alert("La durata deve essere almeno di 1 minuto");
        return false;
    }

    if (video.durationMinutes > 240) {
            alert("La durata non può superare le 4 ore (240 minuti)");
            return false;
    }

    const validLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
    if (!validLevels.includes(video.level)) {
        alert("Il livello selezionato non è valido!");
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

        document.getElementById("playlist-title").innerHTML =
            playlist.title;


        document.getElementById("playlist-author").innerHTML =
            "Autore: " + playlist.author;

        document.getElementById("playlist-category").innerHTML =
            "Categoria: " + playlist.category;

        //SE L'UTENTE NON E IL PROPRIETARIO DISABILITA LA VISTA DI NUOVO VIDEO
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
                <td>${video.title}</td>
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


async function saveVideo() {

   if(!isPlaylistOwner) {
      showError("Azione non consentita: Non sei il proprietario di questa playlist!");
      closeModal("insertVideoModal");
      return;
   }

    const loggedUser = sessionStorage.getItem("loggedUser");

    const video = {
        title: document.getElementById("video-title").value,
        durationMinutes: parseInt(
            document.getElementById("video-duration").value
        ),
        level: document.getElementById("video-level").value,
        username: loggedUser
    };

    if (!validateVideo(video)) {
        return;
    }

    try {
        video.title = video.title.trim();

        await createVideo(playlistId, video, loggedUser);
        showSuccess("Video creato con successo");
        closeModal("insertVideoModal");
        clearInputs( "video-title", "video-duration");
        loadVideos();

    } catch (error) {
        showError(error.message);
    }
}


async function editVideo(id) {

    selectedVideoId = id;
    const video = await getVideo(id);

    document.getElementById("upd-video-title").value =
        video.title;

    document.getElementById("upd-video-duration").value =
        video.durationMinutes;

    document.getElementById("upd-video-level").value =
        video.level;

    openModal("updateVideoModal");
}


async function saveVideoUpdate() {

    const video = {
        title: document.getElementById("upd-video-title").value,
        durationMinutes: parseInt(
            document.getElementById("upd-video-duration").value
        ),
        level: document.getElementById("upd-video-level").value,
        username: sessionStorage.getItem("loggedUser")
    };

    if(!validateVideo(video)) {
       return;
    }

    try {
        video.title = video.title.trim();

        await updateVideoService(selectedVideoId, video);
        showSuccess("Video aggiornato");
        closeModal("updateVideoModal");
        loadVideos();

    } catch (error) {
        showError(error.message);
    }
}


async function deleteVideo(id) {
    if (!confirm("Vuoi eliminare questo video?"))
        return;

    try {

        await deleteVideoService(id);
        showSuccess("Video eliminato");
        loadVideos();

    } catch (error) {
        showError(error.message);
    }
}