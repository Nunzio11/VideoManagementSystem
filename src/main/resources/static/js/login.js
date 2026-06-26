async function login() {

    const credentials = {

        username: document.getElementById("username").value,

        password: document.getElementById("password").value

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

            window.location.href = "index.html";

        }

        else {

            alert("Username o Password non validi");

        }

    }

    catch (error) {

        console.error(error);

        alert("Impossibile contattare il server");

    }

}