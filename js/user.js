$(document).ready(function () {
    $("#profile-toggle").click(function () {
        $("#profile-settings").slideToggle();
    });
});

function showAlert() {
    alert('No active reserves!');
}

$(document).ready(function() {
    $('.cancel-btn').click(function() {
        var purchaseId = $(this).data('purchase-id');
        cancelPurchase(purchaseId);
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
    // Verificar se há um usuário logado
    const history = sessionStorage.getItem('purchaseHistory');
    // Selecionar o local na barra de navegação onde o nome de usuário deve ser exibido
    const purchaseHistoryContainer = document.getElementById('purchaseHistory');

    // Verificar se o usuário está logado e atualizar dinamicamente a barra de navegação
    if (history) {
        const purchases = JSON.parse(history);
        // Criar uma div para conter os itens de compra
        const purchaseHistoryDiv = document.createElement('div');
        purchaseHistoryDiv.classList.add('purchase-history');
        purchaseHistoryDiv.classList.add('purchase-item');

        // Exibir o histórico de compras
        purchases.forEach(purchase => {
            purchase.forEach(element => {
                    console.log(element.user);
                    console.log(loggedInUser);
                    const purchaseItemElement = document.createElement('div');
                    purchaseItemElement.classList.add('purchase-item');
                    purchaseItemElement.innerHTML = `
                        <img src="${element.image}" alt="${element.name}">
                        <div class="product-type">${element.type}</div>
                        <div class="product-details">
                            <div>${element.name}</div>
                            <div>${element.price} €</div>
                        </div>
                        <button class="btn btn-danger btn-sm cancel-btn" data-purchase-id="${purchase.index}">Cancelar</button>
                    `;
                    purchaseHistoryDiv.appendChild(purchaseItemElement);
            });
        });

        // Adicionar a div de histórico de compras ao contêiner principal
        purchaseHistoryContainer.appendChild(purchaseHistoryDiv);
    } else {
        // Se o histórico de compras estiver vazio, exibir uma mensagem informativa
        purchaseHistoryContainer.innerHTML = `
            <div class="section-box">
                <p style="font-size: 18px;">Ainda não fez nenhuma compra</p>
                <button class="btn btn-primary mt-3" onclick="window.location.href='alojamento.html'">Procurar produtos</button>
            </div>
        `;
    }

    // JavaScript para confirmação de cancelamento 
    purchaseHistoryContainer.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('cancel-btn')) {
            const purchaseId = event.target.getAttribute('data-purchase-id');
            if (confirm('Tem certeza que deseja cancelar esta compra?')) {
                // Simulação de envio de solicitação de cancelamento para o backend
                alert('Compra ' + purchaseId + ' cancelada.');
                // Aqui você pode fazer uma solicitação AJAX para cancelar a compra no servidor
            }
        }
    });
});






