async function register() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (firstName.trim() === "") {
        showError("Inserisci il nome");
        return;
    }

    if (lastName.trim() === "") {
        showError("Inserisci il cognome");
        return;
    }

    if (username.trim() === "") {
        showError("Inserisci lo username");
        return;
    }

    if (username.length < 4 || username.length > 20) {
        showError("Lo username deve contenere tra 4 e 20 caratteri");
        return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
        showError("Lo username contiene caratteri non consentiti");
        return;
    }

    if (password.trim() === "") {
        showError("Inserisci la password");
        return;
    }

    if (password.length < 8) {
        showError("La password deve contenere almeno 8 caratteri");
        return;
    }

    if (!/[A-Z]/.test(password)) {
        showError("La password deve contenere almeno una lettera maiuscola");
        return;
    }

    if (password !== confirmPassword) {
        showError("Le password non coincidono");
        return;
    }

    const user = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    };

    try {
        const response = await fetch(
            AUTH_URL + "/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        if (response.ok) {
            showSuccess("Registrazione completata!");
            window.setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            const errorText = await response.text();
            if (errorText) {
                showError(errorText);
            } else {
                showError("Errore durante la registrazione");
            }
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