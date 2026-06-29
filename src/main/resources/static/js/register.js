async function register() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (firstName.trim() === "") {
        alert("Inserisci il nome");
        return;
    }

    if (lastName.trim() === "") {
        alert("Inserisci il cognome");
        return;
    }

    if (username.trim() === "") {
        alert("Inserisci lo username");
        return;
    }

    if (username.length < 4 || username.length > 20) {
        alert("Lo username deve contenere tra 4 e 20 caratteri");
        return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
        alert("Lo username contiene caratteri non consentiti");
        return;
    }

    if (password.trim() === "") {
        alert("Inserisci la password");
        return;
    }

    if (password.length < 8) {
        alert("La password deve contenere almeno 8 caratteri");
        return;
    }

    if (!/[A-Z]/.test(password)) {
        alert("La password deve contenere almeno una lettera maiuscola");
        return;
    }

    if (password !== confirmPassword) {
        alert("Le password non coincidono");
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
            alert("Registrazione completata!");
            window.location.href = "login.html";
        } else {
            const errorText = await response.text();

            if (errorText) {
                alert(errorText);
            } else {
                alert("Errore durante la registrazione");
            }
        }
    } catch (error) {
        console.error(error);
        alert("Impossibile contattare il server");
    }
}