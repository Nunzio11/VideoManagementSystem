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

    const loggedUser = sessionStorage.getItem("loggedUser");

    const video = {
        title: document.getElementById("video-title").value,
        durationMinutes: parseInt(document.getElementById("video-duration").value),
        level: document.getElementById("video-level").value,
        videoUrl: document.getElementById("video-url").value,
        username: loggedUser
    };

    try {
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
    const video = {
        title: document.getElementById("upd-video-title").value,
        durationMinutes: parseInt(document.getElementById("upd-video-duration").value),
        level: document.getElementById("upd-video-level").value,
        videoUrl: document.getElementById("upd-video-url").value,
        username: sessionStorage.getItem("loggedUser")
    };

    try {
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