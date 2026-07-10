let selectedPlaylistId = null;

checkLogin();
loadPlaylists();

function validatePlaylist(playlist) {
    if (playlist.title.trim().length === 0 || playlist.category.trim().length === 0) {
        showError("I campi non possono contenere solo spazi vuoti");
        return false;
    }

    // Protezione da caratteri inutili
    const validPattern = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ ]+$/;

    if(!validPattern.test(playlist.title)) {
       showError("Il titolo può contenere solo lettere e spazi");
       return false;
    }

    if(!validPattern.test(playlist.category)) {
       showError("La categoria può contenere solo lettere e spazi");
       return false;
    }

    if (playlist.title.trim().length < 6 || playlist.title.trim().length > 50) {
        showError("Il titolo deve contenere tra i 6 e i 50 caratteri");
        return false;
    }

    if (playlist.category.trim().length < 3 || playlist.category.trim().length > 50) {
        showError("La categoria deve contenere tra i 3 e i 50 caratteri");
        return false;
    }

    return true;
}

async function loadPlaylists() {
    try {
        const loggedUser = sessionStorage.getItem("loggedUser");
        if (loggedUser) {
            document.getElementById("user-greeting").innerHTML = "Ciao, " + loggedUser;
        }

        const playlists = await getAllPlaylists();
        const table = document.getElementById("playlist-table");

        table.innerHTML = "";

        playlists.forEach(playlist => {
            const isOwner = playlist.username === loggedUser;

            table.innerHTML += `
                <tr>
                    <td>${playlist.title}</td>
                    <td>${playlist.author} (@${playlist.username})</td>
                    <td>${playlist.category}</td>
                    <td>${playlist.videos?.length ?? 0}</td>
                    <td>
                        <button class="btn btn-warning btn-sm"
                            onclick="editPlaylist(${playlist.id})"
                            ${!isOwner ? "disabled" : ""}>
                            ✏️
                        </button>
                        <button class="btn btn-danger btn-sm"
                            onclick="deletePlaylist(${playlist.id})"
                            ${!isOwner ? "disabled" : ""}>
                            🗑️
                        </button>
                        <button class="btn btn-primary btn-sm"
                            onclick="showVideos(${playlist.id})">
                            🎬
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error(error);
        showError("Errore durante il caricamento delle playlist");
    }
}

async function savePlaylist() {
    const playlist = {
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        username: sessionStorage.getItem("loggedUser")
    };

    if (!validatePlaylist(playlist)) {
        return;
    }

    try {
        playlist.title = playlist.title.trim();
        playlist.category = playlist.category.trim();

        await createPlaylist(playlist);
        showSuccess("Playlist creata con successo");
        closeModal("insertModal");
        clearInputs("title", "category");
        loadPlaylists();
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

async function editPlaylist(id) {
    selectedPlaylistId = id;

    const playlist = await getPlaylist(id);

    document.getElementById("upd-title").value = playlist.title;
    document.getElementById("upd-category").value = playlist.category;
    document.getElementById("btn-save-update").dataset.id = id;

    openModal("updateModal");
}

async function saveUpdate() {
    const playlist = {
        title: document.getElementById("upd-title").value,
        category: document.getElementById("upd-category").value
    };

    if (!validatePlaylist(playlist)) {
        return;
    }

    try {
        playlist.title = playlist.title.trim();
        playlist.category = playlist.category.trim();

        await updatePlaylistService(selectedPlaylistId, playlist);
        showSuccess("Playlist aggiornata");
        closeModal("updateModal");
        loadPlaylists();
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

async function deletePlaylist(id) {
    const result = await Swal.fire({
        title: 'Sei sicuro?',
        text: "Rimuoverai anche tutti i video all'interno!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sì, eliminala!',
        cancelButtonText: 'Annulla'
    });

    if (result.isConfirmed) {
        try {
            await deletePlaylistService(id);
            showSuccess("Playlist eliminata");
            loadPlaylists();
        } catch (error) {
            showError(error.message);
        }
    }
}

function showVideos(id) {
    window.location.href = "videos.html?playlistId=" + id;
}

function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: message,
        confirmButtonColor: '#0d6efd'
    });
}

function openModal(id) {
    const modalElement = document.getElementById(id);
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}

function closeModal(id) {
    const modalElement = document.getElementById(id);
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
}

function clearInputs(...ids) {
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = "";
    });
}