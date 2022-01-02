export const a_ascii = 97;

export function toLetter(ascii_offset: number) {
    return String.fromCharCode(ascii_offset + a_ascii);
};

export function toLetterIndex(letter: string) {
    return letter.charCodeAt(0) - a_ascii;
}