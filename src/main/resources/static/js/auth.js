function checkLogin() {

    const user = sessionStorage.getItem("loggedUser");
    if (!user) {
        window.location.replace("login.html");

    }

}

function logout() {

    sessionStorage.removeItem("loggedUser");
    sessionStorage.clear();
    window.location.replace("login.html");

}