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
    const cart = []; // Array to hold cart items

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.slice(0));
            const productImage = product.querySelector('img').src;

            const cartItem = { name: productName, price: productPrice, type: "Loja", image: productImage };
            cart.push(cartItem); // Add item to the cart array

            cartTotal += productPrice;

            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                ${productName} - ${productPrice.toFixed(2)} €
                <button class="remove-item">Remove</button>
            `;
            cartItemsList.appendChild(cartItemElement);

            document.getElementById('cart-total').textContent = `${cartTotal.toFixed(2)} €`;
        });
    });

    cartItemsList.addEventListener('click', event => {
        if (event.target.classList.contains('remove-item')) {
            const removedItem = event.target.closest('li');
            const removedPrice = parseFloat(removedItem.textContent.split(' - ')[1].slice(0));
            const removedItemName = removedItem.textContent.split(' - ')[0];

            cartTotal -= removedPrice;

            // Remove item from the cart array
            const index = cart.findIndex(item => item.name === removedItemName && item.price === removedPrice);
            if (index !== -1) {
                cart.splice(index, 1);
            }

            removedItem.remove();

            document.getElementById('cart-total').textContent = `${cartTotal.toFixed(2)} €`;
        }
    });

    // Event listener for the "Finalizar Compra" button
    document.querySelector('.finalizarCompra').addEventListener('click', () => {
        fetch('/finalizar_compra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ items: cart }),
        }).then(response => {
            if (response.ok) {
                alert('Compra finalizada com sucesso!');
                cart.length = 0; // Clear the cart array
                cartItemsList.innerHTML = ''; // Clear the cart display
                cartTotal = 0;
                document.getElementById('cart-total').textContent = '0.00 €';
            } else {
                alert('Ocorreu um erro ao finalizar a compra. Tente novamente.');
            }
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
