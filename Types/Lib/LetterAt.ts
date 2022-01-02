export const a_ascii = 97;

export function toLetter(ascii: number) {
    return String.fromCharCode(ascii + a_ascii);
};

export function toAscii(letter: string) {
    return letter.charCodeAt(0) - a_ascii;
}