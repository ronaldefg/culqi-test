export function isLuhnValid(cardNumber: string): boolean {
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

export function identifyCardType(cardNumber: string): string {
    const sanitizedNumber = cardNumber.replace(/\D/g, ''); // Elimina caracteres no numéricos

    if (/^4/.test(sanitizedNumber) && (sanitizedNumber.length === 13 || sanitizedNumber.length === 16)) {
        return 'visa';
    } else if (/^5/.test(sanitizedNumber) && sanitizedNumber.length === 16) {
        return 'mastercard';
    } else if (/^3[47]/.test(sanitizedNumber) && sanitizedNumber.length === 15) {
        return 'amex';
    } else {
        return '';
    }
}

export function isValidCVV(cardType: string, cvv: string): boolean {
    if (cardType === 'amex') {
        return /^[0-9]{4}$/.test(cvv);
    } else {
        return /^[0-9]{3,4}$/.test(cvv);
    }
}

export function isValidExpirationDate(month: string, year: string): boolean {
    const currentYear = new Date().getFullYear();
    const expirationYear = parseInt(year, 10);
    const expirationMonth = parseInt(month, 10);

    return (
        expirationYear >= currentYear &&
        expirationYear <= currentYear + 5 &&
        expirationMonth >= 1 &&
        expirationMonth <= 12
    );
}

export function isValidEmail(email: string): boolean {
    return /^[\w-]+(\.[\w-]+)*@((gmail\.com)|(hotmail\.com)|(yahoo\.es))$/.test(email);
}

export function maskCardNumber(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 4) {
        throw new Error('Número de tarjeta no válido');
    }

    const lastFourDigits = cardNumber.slice(-4);

    const maskedDigits = '*'.repeat(cardNumber.length - 4);

    return maskedDigits + lastFourDigits;
}