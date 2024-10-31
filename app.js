let result = document.querySelector(".result")
let condition = document.querySelector(".condition")
let symbol = ""
let flag = false

function display(text){
    if(text == ''){
        symbol = ''
        result.innerText = ''
        condition.innerText = ''
        flag = false
        return
    }
    if (result.innerText.trim() === '' && (text === '+' || text === '-' || text === '*' || text === '/')) {
        return
    }
    if (result.innerText === '0' || flag) {
        result.innerText = ''
        flag = false
    }
    if(flag && text !== ''){
        let temp1 = result.innerText.split(symbol)
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
        result.innerText = `${temp1[0]}${symbol}${temp2}`
        console.log(temp2)
        return
    }
    
    
    if(result.innerText == '0'){
        if(text !== '.'){
            if(text.split('').length !=3){
                result.innerText = text
                return
            }
        }
    }
    if(toAddEmpthEndOfResult()){
        result.innerText += ` ${text}`
        return
    }
        result.innerText += text 
}
 
function backspace() {
    // Geride kalan sayı içinde nokta var mı kontrol et
    if (result.innerText.endsWith('.')) {
        decimalAdded = false
    }
    
    let temp = result.innerText.split('')
    let lastChar = temp.pop() 

    if (!isNaN(lastChar.trim())) {
        result.innerText = temp.join('').trim()
    } else {
        result.innerText = temp.join('').trim()
    }
    if (result.innerText === '') {
        symbol = '' 
    } else {
        if (lastChar.trim() === '+' || lastChar.trim() === '-' || lastChar.trim() === '*' || lastChar.trim() === '/') {
            symbol = '' 
        }
    }
}

function calculate() {
    let answer = result.innerText
    let temp = result.innerText.split(symbol)

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
    let isSecondSizeIsEmpty = false

    switch(symbol){
        case " + ":
            temp = result.innerText.split(" +")
            console.log(temp)
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break
        case " / ":
            temp = result.innerText.split(" /")
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break
        case " - ":
            temp = result.innerText.split(" -")
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break
        case " * ":
            temp = result.innerText.split(" *")
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break
    }
    console.log(isSecondSizeIsEmpty)

    return isSecondSizeIsEmpty
}

let decimalAdded = false

function Point() {
    if (symbol === '') {
        if (!result.innerText.includes('.') && !checkSymbol()) {
            display('.')
            decimalAdded = true
        }
    } else {
        let temp = result.innerText.split(symbol)
        if (temp[1] !== '' && !temp[1].includes('.')) {
            display('.')
            decimalAdded = true // Nokta eklendi
        }
    }
}

function addition() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate();
        }
        symbol = " + "
        result.innerText += " + " 
        flag = false
    }
}

function division() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate()
        }
        symbol = " / "
        result.innerText += " / " 
        flag = false 
    }
}
function subtraction() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate() 
        }
        symbol = " - "
        result.innerText += " - " 
        flag = false 
    }
}
function multiplication() {
    if (result.innerText !== '0' && !checkSymbol()) {
        if (symbol) {
            result.innerText = calculate() 
        }
        symbol = " * "
        result.innerText += " * " 
        flag = false
    }
}

function equalSign() {
    let resultValue = calculate()
    result.innerText = resultValue
    symbol = '' 
    flag = true 
    decimalAdded = false
}

function percentage() {
    let currentText = result.innerText.trim()
    
    if (symbol) {
        let temp = currentText.split(symbol)
        
        if (temp.length === 2) {
            let num2 = Number(temp[1].trim())
            if (!isNaN(num2)) {
                num2 = num2 / 100 
                result.innerText = `${temp[0].trim()} ${symbol} ${num2}` 
                return
            }
        }
    }

    let singleNum = Number(currentText)
    if (!isNaN(singleNum)) {
        result.innerText = (singleNum / 100).toString()
    }
}

function plusMinus() {
    let currentText = result.innerText.trim()
    
    if (symbol) {
        let temp1 = currentText.split(symbol)
        
        if (temp1.length === 2) {
            let num2 = temp1[1].trim()
            if (num2.startsWith('-')) {
                num2 = num2.substring(1) 
            } else {
                num2 = '-' + num2 
            }
            result.innerText = `${temp1[0].trim()} ${symbol} ${num2}`
        }
    } else {
        let singleNum = Number(currentText)
        if (!isNaN(singleNum)) {
            result.innerText = (-singleNum).toString() 
        }
    }
}

function toAddEmpthEndOfResult(){
    let temp = result.innerText.split('')
    if(temp[temp.length-1] == "-" || temp[temp.length-1] == "+" || temp[temp.length-1] == "/" || temp[temp.length-1] == "*"){
        return true
    }
}
document.addEventListener('keydown', function(event) {
    const key = event.key

    // Kullanıcı tuşlara basıldığında hangi fonksiyonun çalıştırılacağını kontrol et
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
