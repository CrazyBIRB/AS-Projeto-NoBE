function applyFilters() {
    const cityFilters = Array.from(document.querySelectorAll('input[name="city"]:checked')).map(cb => cb.value);
    const genderFilter = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    const experienceFilter = document.querySelector('input[name="experience"]:checked') ? parseFloat(document.querySelector('input[name="experience"]:checked').value) : null;
    const ratingFilter = document.querySelector('input[name="rating"]:checked') ? parseFloat(document.querySelector('input[name="rating"]:checked').value) : null;

    document.querySelectorAll('.sitter-item').forEach(item => {
        const itemCity = item.getAttribute('data-city');
        const itemGender = item.getAttribute('data-gender');
        const itemExperience = parseFloat(item.getAttribute('data-experience'));
        const itemRating = parseFloat(item.getAttribute('data-rating'));

        const cityMatch = cityFilters.length ? cityFilters.includes(itemCity) : true;
        const genderMatch = genderFilter ? itemGender === genderFilter : true;
        const experienceMatch = experienceFilter ? itemExperience >= experienceFilter : true;
        const ratingMatch = ratingFilter ? itemRating >= ratingFilter : true;

        if (cityMatch && genderMatch && experienceMatch && ratingMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

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

