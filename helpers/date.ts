function integerPrecision(number: number, precision: number) {
    return `${number < 10 ? '0' : ''}${number}`;
}

export function dateFormatter(postDate: Date): string {
    const date = new Date(postDate);
    const year = date.getFullYear();
    const month = integerPrecision(date.getMonth() + 1, 2);
    const day = integerPrecision(date.getDate(), 2);
    const hours = integerPrecision(date.getHours(), 2);
    const minutes = integerPrecision(date.getMinutes(), 2);

    return `${month}/${day}/${year} - ${hours}:${minutes}`;
}
