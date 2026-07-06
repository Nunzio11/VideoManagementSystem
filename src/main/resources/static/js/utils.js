function showSuccess(message){
    alert(message);
}

function showError(message){
    alert(message);
}

// EVITIAMO DI DUPLICARE I MODAL IN MEMORIA
function openModal(id){
    const modalElement = document.getElementById(id);
    if (modalElement) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    }
}


function closeModal(id){
    const modalElement = document.getElementById(id);
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
}

function clearInputs(...ids){
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = "";
    });
}
