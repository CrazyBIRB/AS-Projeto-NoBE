document.getElementById('searchBox').addEventListener('input', function() {
    var searchQuery = this.value.toLowerCase();
    var hotelItems = document.querySelectorAll('.product');

    hotelItems.forEach(function(item) {
        var productName = item.getAttribute('data-name').toLowerCase();

        if (productName.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Function to toggle the visibility of the "carrinho" button
function toggleCartButtonVisibility() {
    const cartButton = document.getElementById('openSidebarBtn');
    cartButton.style.display = cartButton.style.display === 'none' ? 'block' : 'none';
}

function openSidebar() {
    document.getElementById("sidebar").style.width = "250px"; // Define a largura do sidebar
    toggleCartButtonVisibility(); // Hide the "carrinho" button when sidebar opens
}
  
// Função para fechar o sidebar
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0"; // Define a largura do sidebar para 0
    toggleCartButtonVisibility(); // Show the "carrinho" button when sidebar closes
}
  
// Event listeners para os botões
document.getElementById('openSidebarBtn').addEventListener('click', openSidebar);
document.getElementById('closeSidebarBottomBtn').addEventListener('click', closeSidebar);
// Event listener for the "fechar carrinho" button
document.getElementById('closeSidebarBottomBtn').addEventListener('click', closeSidebar);


document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartItemsList = document.getElementById('cart-items');
    let cartTotal = 0;

    // Recuperar o carrinho do sessionStorage associado ao usuário, se existir
    let cart = sessionStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    // Função para atualizar o carrinho na interface do usuário
    function updateCartUI() {
        cartItemsList.innerHTML = ''; // Limpar a lista de itens do carrinho

        // Iterar sobre os itens do carrinho e adicionar à lista na interface do usuário
        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                ${item.name} - ${item.price.toFixed(2)} € 
                <button class="remove-item">Remove</button>
            `;
            cartItemsList.appendChild(cartItemElement);
        });

        // Atualizar o total do carrinho na interface do usuário
        document.getElementById('cart-total').textContent = `${cartTotal.toFixed(2)} €`;
    }

    // Função para salvar o carrinho no sessionStorage associado ao usuário
    function saveCartToSessionStorage() {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.slice(0));
            const productImage = product.querySelector('img').src;
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')).username;

            const cartItem = { user: loggedInUser, name : productName, price: productPrice, type: "Loja", image: productImage };
            cart.push(cartItem); // Adicionar item ao carrinho
            cartTotal += productPrice; // Atualizar o total do carrinho

            // Atualizar a interface do usuário
            updateCartUI();
            // Salvar o carrinho no sessionStorage
            saveCartToSessionStorage();
        });
    });

    cartItemsList.addEventListener('click', event => {
        if (event.target.classList.contains('remove-item')) {
            const removedItemIndex = Array.from(cartItemsList.children).indexOf(event.target.parentElement);
            const removedItemPrice = cart[removedItemIndex].price;

            cart.splice(removedItemIndex, 1); // Remover item do carrinho
            cartTotal -= removedItemPrice; // Atualizar o total do carrinho

            // Atualizar a interface do usuário
            updateCartUI();
            // Salvar o carrinho no sessionStorage
            saveCartToSessionStorage();
        }
    });

    // Event listener para o botão "Finalizar Compra"
    document.querySelector('.finalizarCompra').addEventListener('click', () => {
        // Obter o histórico de compras do usuário do sessionStorage
        let purchaseHistory = sessionStorage.getItem('purchaseHistory');
        purchaseHistory = purchaseHistory ? JSON.parse(purchaseHistory) : [];

        // Adicionar o carrinho atual ao histórico de compras
        purchaseHistory.push(cart);
        // Atualizar o histórico de compras no sessionStorage
        sessionStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

        // Simular finalização da compra
        alert('Compra finalizada com sucesso!');
        cart.length = 0;
        // Atualizar a interface do usuário
        updateCartUI();
        sessionStorage.removeItem('cart');
        document.getElementById('cart-total').textContent = '0.00 €';
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
