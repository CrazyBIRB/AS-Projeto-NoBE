// Função para obter a lista de usuários do sessionStorage
function getUsers() {
    const users = sessionStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Função para salvar a lista de usuários no sessionStorage
function saveUsers(users) {
    sessionStorage.setItem('users', JSON.stringify(users));
}

// Função para inicializar o admin user
function initializeAdminUser() {
    const users = getUsers();
    if (users.length === 0) {
        users.push({ username: 'admin', password: 'admin' });
        saveUsers(users);
    }
}

// Chama a função para inicializar o admin user
initializeAdminUser();

// Função de registro
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        const users = getUsers();
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Nome de usuário já existe.');
        } else {
            users.push({ username, password });
            saveUsers(users);
            alert('Usuário registrado com sucesso!');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função de login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    let valid = false; // Use 'let' para permitir a alteração

    console.log('Tentando login com:', username, password); // Log inicial

    const users = getUsers();
    console.log('Usuários carregados:', users); // Log dos usuários carregados

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login realizado com sucesso!');
        console.log('Usuário encontrado:', user); // Log do usuário encontrado
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        valid = true; // Altere o valor para true
    } else {
        alert('Nome de usuário ou senha incorretos.');
        console.log('Usuário não encontrado'); // Log de usuário não encontrado
    }

    console.log('Valid:', valid); // Adicione este log

    if (valid) {
        console.log('Redirecionando para dashboard.html'); // Adicione este log
        window.location.href = '../html/index.html'; // Redirecione para a página correta
    }
}
