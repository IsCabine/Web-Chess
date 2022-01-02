import Vue from 'Vue';
import { toLetter } from '../Lib/LetterAt';

let app = new Vue({
    methods: { 
        toLetter,
    },
});
app.$mount('#app');