
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
        timer: 2000,
        timerProgressBar: true
    });
}


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