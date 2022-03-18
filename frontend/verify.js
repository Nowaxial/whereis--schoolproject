const buttonElem = document.querySelector('#verify-button');
const verifyElem = document.querySelector('#verify-ticket')

async function staffLoggedIn() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:9000/api/auth/tokenCheck', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    const data = await response.json();

    if (data.success == false) {
        verifyElem.style.display = "none";
        buttonElem.style.display = "none"; 
        window.location.href = "http://localhost:9000/staff.html"
          
    }  
}


async function verify() {
    const token = sessionStorage.getItem('token');
    const orderNr = verifyElem.value;
    
    let response = await fetch("http://localhost:9000/api/event/verify", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderNr }),
    });

    const data = await response.json();
    alert(data);
}

buttonElem.addEventListener('click', () => {
    verify();
});

staffLoggedIn();

