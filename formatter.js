function formatter(input_text) {
    let output_text = '';
    let indent_level = 0;
    let tab = '\t';

    //Clean up whitespace. Replace carraige returns, then set all whitespace to spaces, then replace consecutive spaces with one space. This helps the parser determine what sort of object it is handling 
    input_text = input_text.replace(/(?:\r\n|\r|\n)/g, ' <<<newline>>> ').replace(/\s/g, ' ').replace(/ +/g, ' ').split(' ');

    for (character of input_text) {
        let new_text = function(character){
            switch (character) {
                case '(' || '[':
                    indent_level++; 
                    return character + '<<<newline>>>' + tab.repeat(indent_level);
                    break;
                
                default:
                    return character
            }
        };
        output_text = output_text + new_text(character)
    }

    //Add carriage returns back
    output_text = output_text.replace(/<<<newline>>>/g, '\r')

    // Update the DOM
    document.getElementById('output_text').innerHTML = output_text
};