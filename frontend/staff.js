//Logga in
const loginUsername = document.querySelector('#username-login');
const loginPassword = document.querySelector('#password-login');
const loginButton = document.querySelector('#login-button');




async function login(credentials) {
    const response = await fetch('http://localhost:9000/api/event/staff-login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
        // Spara token i sessionStorage
        saveToken(data.token);
        window.location.href = 'http://localhost:9000/verify.html';
    }
}

function saveToken(token) {
    sessionStorage.setItem('token', token);
}


loginButton.addEventListener('click', () => {
    const credentials = {
        username: loginUsername.value,
        password: loginPassword.value
    }

    login(credentials);
});




