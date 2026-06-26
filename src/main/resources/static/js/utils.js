function showSuccess(message){

    alert(message);

}

function showError(message){

    alert(message);

}

function openModal(id){

    const modal = new bootstrap.Modal(
        document.getElementById(id)
    );

    modal.show();

}

function closeModal(id){

    bootstrap.Modal
        .getOrCreateInstance(
            document.getElementById(id)
        )
        .hide();

}

function clearInputs(...ids){

    ids.forEach(id=>{

        document.getElementById(id).value="";

    });

}