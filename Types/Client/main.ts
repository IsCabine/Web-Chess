import Vue from 'Vue';
import { toLetter } from '../lib/LetterAt';

let app = new Vue({
    methods: { 
        toLetter,
    },
});
app.$mount('#app');