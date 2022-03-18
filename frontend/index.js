const menuElem = document.querySelector('#menu');
const orderButton = document.querySelector('#order-button');
const orderNumberElem = document.querySelector('#order-number');
const eventList = document.querySelector('#eventList');



async function order(order) {
    const response = await fetch('http://localhost:9000/api/event/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    
    console.log('Hela beställningen efter klicket', data);
    sessionStorage.setItem("order",JSON.stringify(data));

}
    







 function showMenu(menu) {
    
        console.log('testar detta!', menu);
    
    // Loopa igenom menyn och för varje menyalternativ:
    // 1. Skapa en li-tagg
    // 2. I li-taggen lägg till namn och pris
    // 3. Lägg till li-taggen i menuElem (ul-taggen)
    menu.forEach((menuItem) => {
        const itemElem = document.createElement('li');
        itemElem.classList.add('menu-item'); // Sätter en css-klass på min li-tagg som är definerad i styles.css
        itemElem.innerHTML = `<span></span><span></span>`;
        menuElem.append(itemElem);

        itemElem.addEventListener('click', () => { // Kopplar en eventlistener till varje li-tagg
            const eventOrder = {
                id: `${menuItem.id}`,
                title: `${menuItem.title}`,
                price:`${menuItem.price}`,
                place: `${menuItem.place}`,
                date: `${menuItem.date}`,
                from: `${menuItem.from}`,
                to: `${menuItem.to}`,
                };
            
            order(eventOrder); // Fetchar vilken föreställning & lägger in det i db
            location.href = "http://localhost:9000/ticket.html";
        
        });
    });
} 


async function getMenu() {
    const response = await fetch('http://localhost:9000/api/event/menu')
    const data = await response.json();

    if (data.success) {
        // Visar menyn
        showMenu(data.menu.shows);
    } else {
        window.location.href = 'http://localhost:9000/index.html';
    }
}


getMenu();
