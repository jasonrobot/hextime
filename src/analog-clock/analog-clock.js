import * as R from 'ramda';

// import ClockHand from './clock-hand';


export default class HexClock extends HTMLElement {
    static get observedAttributes() {
        return [
            'numerals',
            'tick-rate',
            'zero-position',
        ];
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

    }

    positionNumerals() {
        const angleBetweenNumerals = R.divide(this.numerals.length, 360);
        R.flip(R.times)(this.numerals.length)(R.multiply(angleBetweenNumerals));
    }

    connectedCallback() {
        if (this.tickRate) {
            this.intervalId = window.setInterval(this.updateTime, this.tickRate);
        }
        //need to set the initial time here
    }

    disconnectedCallback() {
        window.clearInterval(this.intervalId);
    }

    attributeChangedCallback() {

    }

}

window.customElements.define('hex-clock', HexClock);
