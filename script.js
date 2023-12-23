const GLYPHS_BOOL = true;
let TRANSLATE_BOOL = false;
let BOLD_BOOL = false;

function isTextValid(text) {
    // Define the disallowed characters
    const disallowedChars = ['j', 'x', 'z'];

    // Find the disallowed characters present in the text
    const invalidChars = disallowedChars.filter(char => text.includes(char));

    // Check if any disallowed characters are present in the text
    return {
        isValid: invalidChars.length === 0,
        invalidChars: invalidChars.join(', ')
    };
}

function writeText() {
    // Get the value from the textarea
    text = document.getElementById("textInput").value;

    // Check if the text contains unallowed characters
    const validationResult = isTextValid(text);

    let warningMessage = document.getElementById('warning-message');
    warningMessage.style.display = 'none'; // Hide the warning message initially

    if (!validationResult.isValid) {
        warningMessage.textContent = `Warning: The following characters are not yet known to worshippers: { ${validationResult.invalidChars} }`;
        warningMessage.style.display = 'block';
    }

    // Clear previous content
    document.getElementById('output').innerHTML = '';

    const container = document.getElementById('output');

    const CHARS_PER_COLUMN = 25; // Set your desired number of characters per column

    let characters = text.split('');

    // Here, we create an empty array called grid which will be used to represent the structure of our text in columns.
    let grid = [];

    let columnIndex = 0;
    let currentIndex = 0;

    characters.forEach(char => {
        if (char === ' ' && currentIndex >= CHARS_PER_COLUMN || char === '\n') {
            columnIndex = (columnIndex + 1);
            currentIndex = 0;
        } else {
            if (!grid[columnIndex]) {
                grid[columnIndex] = [];
            }
            grid[columnIndex].push(char);
            currentIndex++;
        }
    });

    // Create a table to represent the grid
    let table = document.createElement('table');
    table.classList.add('grid');

    if (BOLD_BOOL) {
        table.style.fontWeight = 'bold';
    }

    container.appendChild(table);

    // Populate the table with characters, adding some vertical spacing
    for (let i = 0; i < CHARS_PER_COLUMN * 2; i++) {
        let row = document.createElement('tr');
        table.appendChild(row);

        for (let j = 0; j < grid.length; j++) {
            let cell = document.createElement('td');
            if (GLYPHS_BOOL) {
                cell.classList.add('character', 'glyphs');
            } else {
                cell.classList.add('character');
            }

            if (grid[j][i]) {
                let character = grid[j][i];

                let span = document.createElement('span');

                // Check for specific characters 'j' or 'x'
                if (['j', 'x'].includes(character.toLowerCase())) {
                    // Do something specific for 'j' or 'x'
                    span.textContent = character.toUpperCase(); // For example, convert to uppercase
                    span.style.color = 'red'; // Set the text color to red
                } else if (TRANSLATE_BOOL && /^[a-zA-Z]$/.test(character)) {
                    let originalSpan = document.createElement('span');
                    originalSpan.textContent = character;

                    span.appendChild(originalSpan);

                    let translationSpan = document.createElement('span');
                    translationSpan.textContent = ' = ' + character;
                    translationSpan.style.fontFamily = 'Courier New';
                    translationSpan.style.fontWeight = 'normal';

                    span.appendChild(translationSpan);
                } else {
                    span.textContent = character;
                }
                span.style.display = 'inline-block'; // Ensures block-level height properties work
                span.style.height = '16px'; // Adjust this value as needed
                cell.appendChild(span);
            } else {
                cell.innerHTML = '&nbsp;';
            }

            row.appendChild(cell);
        }
    }
}


function toggleBold() {
    BOLD_BOOL = !BOLD_BOOL;
    writeText();
}

function toggleTranslate() {
    TRANSLATE_BOOL = !TRANSLATE_BOOL;
    writeText();
}