const orderObj = JSON.parse(sessionStorage.getItem("order"));

const titleElem = document.querySelector(".title");
const dateElem = document.querySelector(".date");
const priceElem = document.querySelector(".price");
const fromTimeElem = document.querySelector(".from");
const toTimeElem = document.querySelector(".to");
const placeElem = document.querySelector(".place");
const ticketElem = document.querySelector(".ticket");
const allTicketElem = document.querySelector(".tickets");
const barcodeElem= document.querySelector(".BARCODE");


function ticket() {
    titleElem.innerHTML = orderObj.title;
    dateElem.innerHTML = orderObj.date;
    fromTimeElem.innerHTML = orderObj.from;
    toTimeElem.innerHTML = orderObj.to;
    placeElem.innerHTML = orderObj.place;
    ticketElem.innerHTML = "Biljettnr:" + orderObj.orderNr;
    barcodeElem.innerHTML = orderObj.orderNr;
}


setTimeout(function(){sessionStorage.removeItem('order');}, 15 * 1000);


ticket();
