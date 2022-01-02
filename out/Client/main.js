"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Vue_1 = __importDefault(require("Vue"));
var LetterAt_1 = require("../Lib/LetterAt");
var app = new Vue_1.default({
    methods: {
        toLetter: LetterAt_1.toLetter,
    },
});
app.$mount('#app');
