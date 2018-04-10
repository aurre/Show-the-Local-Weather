

function celsiusToFahren(num) {
    let resultTemp = num * 1.8 + 32
    return Math.round(resultTemp)
}

function fahrenToCels(num) {
    let resultTemp = (num - 32) * 0.5556
    return Math.round(resultTemp)
}