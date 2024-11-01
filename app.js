let output = document.querySelector(".output")
let condition = document.querySelector(".condition")
let symbol = ""
let flag = false

function display(text){
    if(text == ''){
        symbol = ''
        output.innerText = ''
        condition.innerText = ''
        flag = false
        return
    }
    if (output.innerText.trim() === '' && (text === '+' || text === '-' || text === '*' || text === '/')) {
        return
    }
    if (output.innerText === '0' || flag) {
        output.innerText = ''
        flag = false
    }
    if(flag && text !== ''){
        let temp1 = output.innerText.split(symbol)
        let temp2 = temp1[1].split('')
        if(temp2[0] === '('){
            temp2.shift()
            temp2.unshift('(')
            temp2.pop()
            temp2.push(text)
            temp2.push(')')
        }else{
            temp2.unshift('(')
            temp2.push(')')
        }
        temp2 = temp2.toString().replaceAll(",","")
        output.innerText = `${temp1[0]}${symbol}${temp2}`
        console.log(temp2)
        return
    }
    
    
    if(output.innerText == '0'){
        if(text !== '.'){
            if(text.split('').length !=3){
                output.innerText = text
                return
            }
        }
    }
    if(toAddEmptyEndOfResult()){
        output.innerText += ` ${text}`
        return
    }
    output.innerText += text 
}
 
function backspace() {
    if (output.innerText.endsWith('.')) {
        decimalAdded = false
    }
    
    let temp = output.innerText.split('')
    let lastChar = temp.pop() 

    if (!isNaN(lastChar.trim())) {
        output.innerText = temp.join('').trim()
    } else {
        output.innerText = temp.join('').trim()
    }
    if (output.innerText === '') {
        symbol = '' 
    } else {
        if (lastChar.trim() === '+' || lastChar.trim() === '-' || lastChar.trim() === '*' || lastChar.trim() === '/') {
            symbol = '' 
        }
    }
}

function calculate() {
    let answer = output.innerText
    let temp = output.innerText.split(symbol)

    let num1 = Number(temp[0].trim())
    let num2 = Number(temp[1].trim())
    let operation = ''

    switch (symbol) {
        case ' + ':
            answer = num1 + num2
            operation = `${num1} + ${num2}`
            break
        case ' - ':
            answer = num1 - num2
            operation = `${num1} - ${num2}`
            break
        case ' / ':
            answer = num1 / num2
            operation = `${num1} / ${num2}`
            break
        case ' * ':
            answer = num1 * num2
            operation = `${num1} * ${num2}`
            break
    }
    condition.innerText = operation

    return answer % 1 === 0 ? answer.toString() : answer.toFixed(6)
}

function checkSymbol(){
    let temp
    let isSecondNumEmpty = false

    switch(symbol){
        case " + ":
            temp = output.innerText.split(" +")
            console.log(temp)
            if(temp[1] == ''){
                isSecondNumEmpty = true
            }else{
                isSecondNumEmpty= false
            }
            break
        case " / ":
            temp = output.innerText.split(" /")
            if(temp[1] == ''){
                isSecondNumEmpty= true
            }else{
                isSecondNumEmpty = false
            }
            break
        case " - ":
            temp = output.innerText.split(" -")
            if(temp[1] == ''){
                isSecondNumEmpty= true
            }else{
                isSecondNumEmpty = false
            }
            break
        case " * ":
            temp = output.innerText.split(" *")
            if(temp[1] == ''){
                isSecondNumEmpty= true
            }else{
                isSecondNumEmpty= false
            }
            break
    }
    console.log(isSecondNumEmpty)

    return isSecondNumEmpty
}

let decimalAdded = false

function Point() {
    if (symbol === '') {
        if (!output.innerText.includes('.') && !checkSymbol()) {
            display('.')
            decimalAdded = true
        }
    } else {
        let temp = output.innerText.split(symbol)
        console.log(temp[1])
        if (temp[1] !== '' && !temp[1].includes('.')) {
            display('.')
            decimalAdded = true 
        }
    }
}

function addition() {
    if (output.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            output.innerText = calculate();
        }
        symbol = " + "
        output.innerText += " + " 
        flag = false
    }
}

function division() {
    if (output.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            output.innerText = calculate()
        }
        symbol = " / "
        output.innerText += " / " 
        flag = false 
    }
}
function subtraction() {
    if (output.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            output.innerText = calculate() 
        }
        symbol = " - "
        output.innerText += " - " 
        flag = false 
    }
}
function multiplication() {
    if (output.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            output.innerText = calculate() 
        }
        symbol = " * "
        output.innerText += " * " 
        flag = false
    }
}

function equalSign() {
    let resultValue = calculate()
    output.innerText = resultValue
    symbol = '' 
    flag = true 
    decimalAdded = false
}

function percentage() {
    let currentText =output.innerText.trim()
    
    if (symbol) {
        let temp = currentText.split(symbol)
        
        if (temp.length === 2) {
            let num2 = Number(temp[1].trim())
            if (!isNaN(num2)) {
                num2 = num2 / 100 
                output.innerText = `${temp[0].trim()} ${symbol} ${num2}` 
                return
            }
        }
    }

    let singleNum = Number(currentText)
    if (!isNaN(singleNum)) {
        output.innerText = (singleNum / 100).toString()
    }
}

function plusMinus() {
    let currentText = output.innerText.trim()
    
    if (symbol) {
        let temp1 = currentText.split(symbol)
        
        if (temp1.length === 2) {
            let num2 = temp1[1].trim()
            if (num2.startsWith('-')) {
                num2 = num2.substring(1) 
            } else {
                num2 = '-' + num2 
            }
            output.innerText = `${temp1[0].trim()} ${symbol} ${num2}`
        }
    } else {
        let singleNum = Number(currentText)
        if (!isNaN(singleNum)) {
            output.innerText = (-singleNum).toString() 
        }
    }  result
}

function toAddEmptyEndOfResult(){
    let temp = output.innerText.split('')
    if(temp[temp.length-1] == "-" || temp[temp.length-1] == "+" || temp[temp.length-1] == "/" || temp[temp.length-1] == "*"){
        return true
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key

    switch (key) {
        case 'c':
        case 'C':
            display('')
            break
        case '/':
            division()
            break
        case '%':
            percentage()
            break
        case '*':
            multiplication()
            break
        case '-':
            subtraction()
            break
        case '+':
            addition()
            break
        case '=':
        case 'Enter':
            equalSign()
            break
        case 'Backspace':
            backspace()
            break
            case '.':
            if (!decimalAdded) {
                Point()
            }
            break
            case '±':
            case 't':
            plusMinus()
            break

        case '0': case '1': case '2': case '3':
        case '4': case '5': case '6': case '7':
        case '8': case '9':
            display(key)
            break
    }
});
