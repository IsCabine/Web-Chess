"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAscii = exports.toLetter = exports.a_ascii = void 0;
exports.a_ascii = 97;
function toLetter(ascii) {
    return String.fromCharCode(ascii + exports.a_ascii);
}
exports.toLetter = toLetter;
;
function toAscii(letter) {
    return letter.charCodeAt(0) - exports.a_ascii;
}
exports.toAscii = toAscii;
