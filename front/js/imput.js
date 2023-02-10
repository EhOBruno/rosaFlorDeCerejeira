$(document).ready(function () {
    document.getElementById("name-input").value = sessionStorage.getItem('nome')
    document.getElementById("email-input").value = sessionStorage.getItem('email')
    document.getElementById("processor-input").value = sessionStorage.getItem('processador')
    document.getElementById("driver-input").value = sessionStorage.getItem('gpu')
    document.getElementById("ram-input").value = sessionStorage.getItem('ram')
});