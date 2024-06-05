document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".carousel-item");

    images.forEach(function(image) {
        const overlay = image.querySelector(".overlay");

        image.addEventListener("mouseenter", function() {
            overlay.style.opacity = "1";
        });

        image.addEventListener("mouseleave", function() {
            overlay.style.opacity = "0";
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Verificar se há um usuário logado
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // Selecionar o local na barra de navegação onde o nome de usuário deve ser exibido
    const userNav = document.getElementById('userNav');

    // Verificar se o usuário está logado e atualizar dinamicamente a barra de navegação
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        const username = user.username;

        // Se o usuário estiver logado, exibir o nome de usuário
        userNav.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="user.html">
                <i class="fas fa-user"></i>
                ${username}
            </li>
            <li class="nav-item">
                <a class="nav-link">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </a>
            </li>
        `;
    } else {
        // Se o usuário não estiver logado, exibir o link de login
        userNav.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="login.html">
                    <i class="fas fa-user"></i>
                    Login     
                </a>
            </li>
        `;
    }
});
