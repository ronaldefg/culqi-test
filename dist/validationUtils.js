"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.isValidExpirationDate = exports.isValidCVV = exports.isLuhnValid = void 0;
function isLuhnValid(cardNumber) {
    const digits = cardNumber.split('').map(Number);
    let sum = 0;
    let alternate = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let currentDigit = digits[i];
        if (alternate) {
            currentDigit *= 2;
            if (currentDigit > 9) {
                currentDigit -= 9;
            }
        }
        sum += currentDigit;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}
exports.isLuhnValid = isLuhnValid;
function isValidCVV(cardType, cvv) {
    if (cardType === 'amex') {
        return /^[0-9]{4}$/.test(cvv);
    }
    else {
        return /^[0-9]{3,4}$/.test(cvv);
    }
}
exports.isValidCVV = isValidCVV;
function isValidExpirationDate(month, year) {
    const currentYear = new Date().getFullYear();
    const expirationYear = parseInt(year, 10);
    const expirationMonth = parseInt(month, 10);
    return (expirationYear >= currentYear &&
        expirationYear <= currentYear + 5 &&
        expirationMonth >= 1 &&
        expirationMonth <= 12);
}
exports.isValidExpirationDate = isValidExpirationDate;
function isValidEmail(email) {
    return /^[\w-]+(\.[\w-]+)*@((gmail\.com)|(hotmail\.com)|(yahoo\.es))$/.test(email);
}
exports.isValidEmail = isValidEmail;
