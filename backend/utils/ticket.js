function generateOrderNr() {
    const letters = ['XAY', 'BZC' ];
    const randomLetter = letters[Math.floor(Math.random() * letters.length)]; // Slumpar bokstäverna 'XAY' & 'BZC'
    const randomNumber = Math.floor(Math.random() * 999); // Slumpar ett tal mellan 0 och 999
    return `${randomLetter}${randomNumber}`; // Sätter ihop det till vårat orderNr (ticket)
}


module.exports = { generateOrderNr }