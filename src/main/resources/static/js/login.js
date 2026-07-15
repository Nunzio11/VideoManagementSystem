async function login() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Controllo preventivo per i campi vuoti
    if (usernameInput.trim() === "" || passwordInput.trim() === "") {
        showError("Inserisci sia lo username che la password");
        return;
    }

    const credentials = {
        username: usernameInput,
        password: passwordInput
    };

    try {
        const response = await fetch(
            AUTH_URL + "/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            }
        );

        if (response.ok) {
            sessionStorage.setItem(
                "loggedUser",
                credentials.username.toLowerCase()
            );


            showSuccess("Accesso effettuato! Benvenuto.");

            window.setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            showError("Username o Password non validi");
        }
    } catch (error) {
        console.error(error);
        showError("Impossibile contattare il server");
    }
}


function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: message,
        confirmButtonColor: '#0d6efd'
    });
}

function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
    });
}