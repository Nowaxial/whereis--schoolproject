const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const { getAccountByUsername, saveMenu, getMenu,
checkTicket, saveOrder, admin, saveTicket, getTickets} = require('./database/operations');
const { comparePassword, hashPassword } = require('./utils/bcrypt'); 
const { generateOrderNr } = require('./utils/ticket');

app.use(express.static('../frontend'));
app.use(express.json());


admin();
saveMenu(); //Spara vår meny till databasen när servern startas



app.get('/api/event/tickets', async (request, response) => {
    const tickets = await getTickets();
    response.json(tickets);
    console.log('tickets:', tickets);
  })
   

app.post('/api/event/verify', async (request, response) => {
    const orderNr= String(request.body.orderNr); // exempel: {ticket: '1234' } ticket/biljett nummer
    console.log('Våran biljettsökning:', orderNr);


    let svar = await checkTicket(orderNr)
        console.log('svar:', svar);
        response.json(svar); 
});

app.get('/api/auth/tokenCheck', async (request, response) => {
    const token = request.headers.authorization.replace('Bearer ', '');
    const resObj = {
        success: false,
        
    }

    try {
        const data = jwt.verify(token, 'a1b1c1'); // Verifera vår token
        

        resObj.success = true;
       
    } catch (error) {
        resObj.errorMessage = 'Token invalid';
    }
    console.log(resObj);
    response.json(resObj);
});


app.post('/api/event/staff-login', async (request, response) => {
    const credentials = request.body;
    //{ username: 'admin', password: 'admin' }

    const resObj = {
        success: false,
        token: ''
    }

    const account = await getAccountByUsername(credentials.username);
    console.log(account);

    if (account.length > 0) {
        const correctPassword = await comparePassword(credentials.password, account[0].password);
        if (correctPassword) {
            resObj.success = true;

            // Vår token blir krypterad med vårt användarnamn som kopplar token till en användare
            const token = jwt.sign({ username: account[0].username }, 'a1b1c1', {
                expiresIn: 600 // Går ut om 10 min (värdet är i sekunder)
            });

            resObj.token = token;
        }
    }

    response.json(resObj);
});

app.get('/api/event/menu', async (request, response) => {
    
    const resObj = {
        success: true,
        menu: ''
    }

    const eventMenu = await getMenu();
        resObj.success = true;
        resObj.menu = eventMenu[0];
        
    response.json(resObj);
});

app.post('/api/event/order', (request, response) => {
    const order = request.body; // Hämta ut beställningen från body
    
    const  resObj = {
        orderNr: ""
    };

        const orderNr = generateOrderNr();
        resObj.orderNr = orderNr;
    
    const mergedObject = {
        ...order,
        ...resObj
        
      }; 
    response.json(mergedObject);
    saveOrder(mergedObject); //Sparar hela ordern & orderNr i databasen
    saveTicket(orderNr); //Sparar order & orderNr i databasen {orderNr:orderNr}
    console.log('Beställningen:', mergedObject); //Kolla i terminalen för att se hur beställningen ser ut
    console.log('Ordernummer:', orderNr); //Kolla i terminalen för att se hur biljetten ser ut

})


app.listen(9000, () => {
    console.log('Server started on port 9000');
});