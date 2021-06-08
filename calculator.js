const display = document.querySelector('.display')

let newNumber = true
let n1 = 0
let currentOperator
let pendingOperation = false

const clearDisplay = ()  =>{
    display.textContent = ''
    pendingOperation = false
}

const updateDisplay = (value) => display.textContent = value.toLocaleString('BR')

const addValue = (value) => display.textContent += value

const isZero = ()  => display.textContent === '0'

const addNumber = (num) => {
    if (newNumber || isZero()) {
        updateDisplay(num)
        newNumber = false
    } else addValue(num)
}

const calculate = ()  => {
    if (pendingOperation) {
        let n2 = parseFloat(display.textContent.replace(',', '.'))
        switch(currentOperator) {
            case '+': {
                updateDisplay(n1 + n2)
                break
            }

            case '-': {
                updateDisplay(n1 - n2)
                break
            }

            case 'x': {
                if (n1 * n2 === 0) updateDisplay('0') 
                else updateDisplay(n1 * n2)
                break
            }

            case '/': {
                updateDisplay(n1 / n2)
                break
            }
        }
    }
}

const thereIsValue = ()  =>  display.textContent.length > 0

const operator = (operator) => {
    if (thereIsValue()) {
        newNumber = true
        if (pendingOperation) calculate()
        n1 = parseFloat(display.textContent.replace(',', '.'))
        currentOperator = operator
        pendingOperation = true
    }
}

const isNegative = ()  => display.textContent.indexOf('-') !== -1

const backspace = ()  => {
    if (display.textContent.length === 2 && isNegative()) display.textContent = ''
    else updateDisplay(display.textContent.slice(0, -1))
}

const thereIsDecimal = ()  => display.textContent.indexOf(',') !== -1

const comma = ()  =>{
    if (!thereIsDecimal()) {
        if (!thereIsValue() || newNumber) {
            addNumber('0')
            newNumber = false
        } else {
            addValue(',')
        }
    }
}

const sign = ()  => {
    if (!isZero() && thereIsValue()) updateDisplay(display.textContent.replace(',', '.') * -1)
}

const equal = ()  => {
    if (thereIsValue()) {
        calculate()
        newNumber = true
        pendingOperation = false
    }   
}
