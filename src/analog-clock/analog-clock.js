import * as R from 'ramda';

// import ClockHand from './clock-hand';
const styleString = require('./analog-clock.css').toString();
const view = require('./analog-clock.mhtml');

export default class AnalogClock extends HTMLElement {
    static get observedAttributes() {
        return [
            'numerals',
            'tick-rate',
            'zero-position',
        ];
    }

    static constructContent(instance) {
        const shadowRoot = instance.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = view();

        const style = document.createElement('style');
        style.textContent = styleString;
        shadowRoot.appendChild(style);
        // shadowRoot.appendChild(styleString);
    }

    constructor() {
        super();
        this.constructor.constructContent(this);
    }

    get numerals() {
        return this.getAttribute('numerals');
    }

    get zeroPosition() {
        return this.getAttribute('zero-position');
    }

    get tickRate() {
        return this.getAttribute('tick-rate');
    }

    updateTime() {
        this.querySelector('analog-clock-hand').tick();
    }

    positionNumerals() {
        const angleBetweenNumerals = R.divide(this.numerals.length, 360);
        R.flip(R.times)(this.numerals.length)(R.multiply(angleBetweenNumerals));
    }

    connectedCallback() {
        if (this.tickRate) {
            this.intervalId = window.setInterval(this.updateTime.bind(this), this.tickRate);
        }
        // need to set the initial time here
    }

    disconnectedCallback() {
        window.clearInterval(this.intervalId);
    }
}

window.customElements.define('analog-clock', AnalogClock);
