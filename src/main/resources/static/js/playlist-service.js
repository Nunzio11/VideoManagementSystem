async function getAllPlaylists() {

    const response = await fetch(PLAYLIST_URL);

    if (!response.ok)
        throw new Error("Errore caricamento playlist");

    return await response.json();
}


async function getPlaylist(id) {

    const response = await fetch(PLAYLIST_URL + "/" + id);

    if (!response.ok)
        throw new Error("Playlist non trovata");

    return await response.json();
}


async function createPlaylist(playlist) {

    const response = await fetch(PLAYLIST_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(playlist)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }

    return await response.json();
}


async function updatePlaylistService(id, playlist) {

    const username = sessionStorage.getItem("loggedUser");

    const response = await fetch(PLAYLIST_URL + "/" + id + "?username=" + encodeURIComponent(username), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(playlist)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }

    return await response.json();
}


async function deletePlaylistService(id){

    const username = sessionStorage.getItem("loggedUser");
    const response = await fetch(

        PLAYLIST_URL + "/" + id + "?username=" + encodeURIComponent(username),

        {
            method:"DELETE"
        }
    );

    if(!response.ok){

        const message = await response.text();
        throw new Error(message);
    }
}

async function getPlaylistVideos(playlistId) {
    const response = await fetch(PLAYLIST_URL + "/" + playlistId + "/videos");
    if (!response.ok)
        throw new Error("Errore caricamento video della playlist");
    return await response.json();
}

async function createVideo(playlistId, video, username) {

    const response = await fetch(PLAYLIST_URL + "/" + playlistId + "/videos?username=" + encodeURIComponent(username), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(video)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }
    return await response.json();
}