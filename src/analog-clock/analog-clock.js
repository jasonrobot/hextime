import * as R from 'ramda';
import D from 'domfu';

import view from './analog-clock-dom';

const styleString = require('./analog-clock.css').toString();

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

        shadowRoot.appendChild(D.style(styleString));

        shadowRoot.append(view());
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
        const clockHands = [...this.querySelectorAll('analog-clock-hand')];
        const sortedHands = clockHands.sort((a, b) => a.handSlot - b.handSlot);
        const tickNext = (hands) => {
            if (hands.length > 0 && R.head(hands).tick() === 0) {
                tickNext(R.tail(hands));
            }
        };
        tickNext(sortedHands);
    }

    positionNumerals() {
        const angleBetweenNumerals = R.divide(this.numerals.length, 360);
        R.flip(R.times)(this.numerals.length)(R.multiply(angleBetweenNumerals));
    }

    connectedCallback() {
        if (this.tickRate) {
            this.intervalId = window.setInterval(
                this.updateTime.bind(this),
                this.tickRate,
            );
        }
        // need to set the initial time here
    }

    disconnectedCallback() {
        window.clearInterval(this.intervalId);
    }
}

window.customElements.define('analog-clock', AnalogClock);
