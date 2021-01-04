function formatter(input_text) {
    let output_text = '';
    let indent_level = 0;
    let tab = '\t';
    let converted_comment_text = '';
    let parsing_string = false;


    //Clean up whitespace by setting all carriage returns to newline characters
    input_text = input_text.replace(/(?:\r\n|\r|\n)/g, '\n');


    //This loop applies preformatting to help the parser determine what kind of objects it's dealing with
    for (let full_text_index=0 ; full_text_index < input_text.length ; full_text_index++) {
        let character = input_text[full_text_index];
        let character_next = input_text[full_text_index+1];

        if(character == '"') {
            parsing_string = !parsing_string
        }

        if(parsing_string) {
            converted_comment_text = converted_comment_text + character

        //Here we handle single line comments, which are a little tricky to parse, so we add some custom formatting and then clean it up at the end of the script
        } else if (character == '/' && character_next == '/') {
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
        } else if(character == ';') {
            converted_comment_text = converted_comment_text + ' ' + character + ' '
        } else {
            converted_comment_text = converted_comment_text + character
        }
    }
    input_text = converted_comment_text;


    //Clean up whitespace. Set all whitespace to spaces, then replace consecutive spaces with one space, then split into an array. This helps the parser determine what sort of object it is handling 
    input_text = input_text.replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').replace(/\s/g, ' ').replace(/ +/g, ' ').split(' ');


    parsing_string = false;
    //This loop handles each object and applies formatting
    for (let object_counter=0 ; object_counter < input_text.length ; object_counter++) {
        let object = input_text[object_counter];

        if(object == '"') {
            parsing_string = !parsing_string
        }

        let new_text = function(object){
            if(parsing_string) {
                return object + ' '
            } else {
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

                // Add formatting(indentation and new lines) to the text
                switch (object) {
                    case '(':
                    case '[':
                    case ';':
                        return object + '\n' + tab.repeat(indent_level);
                        break;
                    
                    case ')':
                    case ']':
                        return '\n' + tab.repeat(indent_level) + object;
                        break;

                    default:
                        return object + ' ';
                }
            }
        };
        output_text = output_text + new_text(object)
    }


    //Add carriage returns back
    output_text = output_text.replace(/<<end_comment>>/g, '\n')


    // Update the DOM
    $('#output_text').val(output_text);
    M.textareaAutoResize($('#output_text'));
};