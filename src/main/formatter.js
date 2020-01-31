
function character_separator(character) {
    this.character = character;
    /* Check for:
        parenthesis
        square brackets
        quotes
        semicolons
        ampersands
        math operators
    */
}

funtion character_reserved(character) {
    this.character = character;
    /*
        contains: + - * / ^ & = ≠ < > ≤ ≥ ( ) , ; [ ] " :: $ }
        contains: AND, OR, XOR, NOT
        begins with a digit or a period
        has the same name as a function, parameter or keyword
    */
}