const nedb = require('nedb-promise');
const database = new nedb({ filename: 'accounts.db', autoload: true });
const {hashPassword} = require('../utils/bcrypt');


const eventMenu = {
    "type": "events",
    "shows":[
      {
        
            "id" : 1,
            "title":"Lasse-Stefanz",
            "place":"Kjell Härnqvist-salen",
            "price":350,
            "date": "21 mars",
            "from": "19.00",
            "to": "21.00",
            
          },

          {
            "id" : 2,
            "title":"Pelle Trubadur",
            "place":"Pubelipuben",
            "price":110,
            "date": "29 mars",
            "from": "22.00",
            "to": "00.00",

          },

          {
            "id" : 3,
            "title":"Kajsas kör",
            "place":"Götaplatsen",
            "price":99,
            "date": "10 april",
            "from": "15.00",
            "to": "16.00",

          },

          {
            "id" : 4,
            "title":"Klubb Untz",
            "place":"Din favoritkällare",
            "price":150,
            "date": "17 april",
            "from": "22.00",
            "to": "du tröttnar",

      }
    ]
  }

async function getAccountByUsername(username) {
    const account = await database.find({ username: username });
    return account;
}

async function admin(){
    const passHash =await hashPassword('admin');
    const admin ={username:'admin' , password: passHash}

      database.insert(admin)
}


function saveTicket(orderNr){
   database.insert({orderNr: orderNr});
}


function saveAccount(account) {
    database.insert(account);
}

function saveMenu() {
    database.insert(eventMenu);
}

async function getMenu() {
    const menu = await database.find({ type: 'events' });
    return menu;
}

function saveOrder(order) {
  // Pushar in beställningen (order)
  database.insert({ order } );
}

async function checkTicket(orderNr){

 const check = await database.find({ orderNr: orderNr });
 console.log('check:', check);
 
  if (check.length > 0 ){
    if (check[0].verified){
      database.remove({orderNr: orderNr});
      return "Biljetten är redan verifierad!"
     }
     else{
      database.update ({ orderNr: orderNr } , {$set:{verified:true}})
      return "Biljetten är verifierad!" }
  }
  return "Kunde inte hitta biljetten!"
}

function getTickets(){
  let ticket = database.find({}) //hämtar allt i databasen.
  return ticket;
}

module.exports = { getAccountByUsername, saveAccount, saveMenu, getMenu, 
saveOrder, admin, getTickets,checkTicket,saveTicket }