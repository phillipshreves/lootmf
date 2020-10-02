function formatter(input_text) {
    let output_text = '';
    let indent_level = 0;
    let tab = '\t';
    let converted_comment_text = ''

    //Clean up whitespace by setting all carriage returns to newline characters
    input_text = input_text.replace(/(?:\r\n|\r|\n)/g, '\n');

    for (let full_text_index=0 ; full_text_index < input_text.length ; full_text_index++) {
        let character = input_text[full_text_index];
        let character_next = input_text[full_text_index+1];
        if (character == '/' && character_next == '/') {
            for(let comment_index=full_text_index ; comment_index < input_text.length ; comment_index++){
                let converted_comment_character = input_text[comment_index]
                if ( converted_comment_character == '\n') {
                    converted_comment_text = converted_comment_text + '<<end_comment>>'
                    break;
                } else {
                    converted_comment_text = converted_comment_text + converted_comment_character
                };
                full_text_index++
            }
        } else {
            converted_comment_text = converted_comment_text + character
        }
    }
    input_text = converted_comment_text;

    //Clean up whitespace. Set all whitespace to spaces, then replace consecutive spaces with one space, then split into an array. This helps the parser determine what sort of object it is handling 
    input_text = input_text.replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').replace(/\s/g, ' ').replace(/ +/g, ' ').split(' ');

    for (object of input_text) {
        let new_text = function(object){

            // indent level control
            switch (object) {
                case '(':
                case '[':
                    indent_level++; 
                    break;

                case ')':
                case ']':
                    indent_level--;
                    break;

                default:
                    break;
            }

            // Add to the text
            switch (object) {
                case '(':
                case '[':
                    return object + '\n' + tab.repeat(indent_level);
                    break;
                
                case ')':
                case ']':
                    return '\n' + tab.repeat(indent_level) + object;
                    break;

                default:
                    return object;
            }
        };
        output_text = output_text + new_text(object)
    }

    //Add carriage returns back
    output_text = output_text.replace(/<<end_comment>>/g, '\n')

    // Update the DOM
    document.getElementById('output_text').innerHTML = output_text
};