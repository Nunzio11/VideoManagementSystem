async function getPlaylistVideos(playlistId){

    const response = await fetch(

        PLAYLIST_URL + "/" + playlistId + "/videos"

    );

    if(!response.ok)
        throw new Error("Errore caricamento video");

    return await response.json();

}

async function getVideo(id){

    const response = await fetch(

        VIDEO_URL + "/" + id

    );

    if(!response.ok)
        throw new Error("Video non trovato");

    return await response.json();

}

async function createVideo(playlistId, video, username) {

    const url = PLAYLIST_URL + "/" + playlistId + "/videos?username=" + encodeURIComponent(username);

    const response = await fetch(url, {
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


async function updateVideoService(id,video){

    const response = await fetch(

        VIDEO_URL+"/"+id,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(video)

        }

    );

    if(!response.ok)
        throw new Error("Errore aggiornamento video");

    return await response.json();

}

async function deleteVideoService(id){

    const username = sessionStorage.getItem("loggedUser");

    const response = await fetch(
        VIDEO_URL + "/" + id + "?username=" + encodeURIComponent(username),
        {
            method: "DELETE"
        }
    );

    if(!response.ok)
        throw new Error("Errore eliminazione video o non autorizzato");
}