
const head = document.querySelector('head');
const style = document.createElement('style');
head.appendChild(style);
const color = document.querySelector('.color_picker');
const input = document.querySelector('.grid_size');
const gridContainer = document.querySelector('.container');
const sizeDimensions = document.querySelector('.size_dimensions')
const rainbowButton = document.querySelector('.rainbow');
const basicColorButton = document.querySelector('.basic');
const eraseButton = document.querySelector('.erase');
const clearButton = document.querySelector('.clear');

let colorChange = 0;
let colorClassLibrary = [];
let mouseDown = false;
let basicMode = true;
let rainbowMode = false;
let eraseMode = false;



function createCssSizeRules(gridSize) {
        const gridContainer = document.querySelector('.container');
        const containerWidth = gridContainer.clientWidth;
        const containerHeight = gridContainer.clientHeight;
    
        const width = containerWidth / gridSize;
        const height = containerHeight / gridSize;
    
        style.textContent = '';
        style.textContent += `.size { width: ${width}px; height: ${height}px; user-select: none;}\n`;


}

function createCssColorRules(divId) {
    if(mouseDown) {
        const gridColor = color.value;
        const currentColor = `color${colorChange}`;
        const gridDiv = document.querySelector(`#${divId}`);
        let success = false;

        for(let colorClass of colorClassLibrary) {
            if(gridColor === colorClass['colorValue']) {
                
                gridDiv.classList = [];
                gridDiv.classList.add('size');          
                gridDiv.classList.add(colorClass['className']);
                success = true
            }
        }

        if(!success) {
            style.textContent += `.${currentColor} {\n background-color: ${gridColor};\n}\n`;
            gridDiv.classList = [];
            gridDiv.classList.add('size');
            gridDiv.classList.toggle(`${currentColor}`);
            colorClassLibrary.push({className: currentColor, colorValue: gridColor});
            colorChange += 1;
        }
    }

    
} 

function createCssRainbowColorRules(divId) {
    if(mouseDown) {
        let randomColor = createRainbow();
        const gridDiv = document.querySelector(`#${divId}`);
    
        style.textContent += `.color${colorChange} {\n background-color: ${randomColor};\n}\n`;
        gridDiv.classList = [];
        gridDiv.classList.add('size');
        gridDiv.classList.toggle(`color${colorChange}`);
        
        colorChange += 1;
    }
}

function eraseCssColorRules(divId) {
    if(mouseDown) {
        const gridDiv = document.querySelector(`#${divId}`);

        gridDiv.classList = []
        gridDiv.classList.add('size');
    }
}

function clearGrid() {
    style.innerHTML = '';
    createCssSizeRules(input.value);
    colorClassLibrary = [];
}

function createGrid(gridSize) {
    const gridContainer = document.querySelector('.container');

    for(let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement('div');
        

        div.classList.toggle('size');
        div.setAttribute('id', `pixel${i}`);
        gridContainer.appendChild(div);

    }
}



function createRainbow() {
    const hexLetters = ['a', 'b', 'c', 'd', 'e', 'f'];
    let hexColor = ['#'];
    for(let i = 0; i < 6; i++){
        let random = Math.floor(Math.random() * 16);
        if(random > 9) {
            let selectedHexLetter = hexLetters[random % 10];
            hexColor.push(selectedHexLetter);
        }
        else {
            hexColor.push(random)
        }
        
    }
    const randomColor =  hexColor.join('');

    return randomColor;
}


function coloAssigner(){
    const gridDivs = document.querySelectorAll('.size');

    gridContainer.addEventListener('mousedown', () => {
        mouseDown = true;

    })

    gridContainer.addEventListener('mouseup', () => {
        mouseDown = false;

    })
    gridDivs.forEach(gridDiv => {
        
        gridDiv.addEventListener('mouseover', () => {
            if(rainbowMode){
                createCssRainbowColorRules(gridDiv.id);
            }
            else if(basicMode) {
                createCssColorRules(gridDiv.id);
            }
            else if(eraseMode) {
                eraseCssColorRules(gridDiv.id);
            }
        })
    })
    gridContainer.addEventListener('mouseleave', () => {
        mouseDown = false;
    })
}

function cleanButtons() {
    basicColorButton.classList.remove('selected');
    rainbowButton.classList.remove('selected');
    eraseButton.classList.remove('selected');
}

function selectedButton() {
    cleanButtons();

    if(basicMode) {
        basicColorButton.classList.add('selected');
    }

    if(rainbowMode) {
        rainbowButton.classList.add('selected');
    }

    if(eraseMode) {
        eraseButton.classList.add('selected');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createGrid(input.value);
    createCssSizeRules(input.value);
    coloAssigner();
})

input.addEventListener('change', () => {
    clearGrid();
    createGrid(input.value);
    createCssSizeRules(input.value);
    coloAssigner();

    sizeDimensions.textContent = `Size: ${input.value} × ${input.value}`


})


rainbowButton.addEventListener('click', () => {
    rainbowMode = true;
    basicMode = false;
    eraseMode = false;
    selectedButton();
})

basicColorButton.addEventListener('click', () => {
    basicMode = true;
    rainbowMode = false;
    eraseMode = false;
    selectedButton();
})

eraseButton.addEventListener('click', () => {
    eraseMode = true;
    rainbowMode = false;
    basicMode = false;
    selectedButton();
})

clearButton.addEventListener('click', () => {
    clearGrid();
})


