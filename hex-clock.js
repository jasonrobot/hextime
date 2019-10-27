import {
    bind,
    construct,
    divide,
    forEach,
    map,
    pipe,
} from 'ramda';

import ClockHand from './clock-hand';

export default class HexClock extends HTMLElement {
    static get observedAttributes() {
        return [
            'numerals',
            'tick-rate',
            'zero-position',
        ];
    }

    constructor() {
        super();
        // const shadowRoot = this.attachShadow({ mode: 'open' });
        // pipe(
        //     map(construct(ClockHand)),
        //     forEach(bind(shadowRoot.appendChild, shadowRoot)),
        // )(hands);
    }

    positionNumerals() {
        const angleBetweenNumerals = divide(this.numerals.length, 360);
    }

    connectedCallback() {
        this.numerals = this.getAttribute('numerals').split(' ');
        this.zeroPosition = this.getAttribute('zero-position');
        this.tickRate = this.getAttribute('tick-rate');

        this.intervalId = window.setInterval(this.updateTime, this.tickRate);
    }

    disconnectedCallback() {
        window.clearInterval(this.intervalId);
    }

    // dont fuckin change the attrs
    // attributeChangedCallback() {}
}

window.customElements.define('hex-clock', HexClock);
