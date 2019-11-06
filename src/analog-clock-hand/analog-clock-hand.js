import * as R from 'ramda';

const styleString = require('./analog-clock-hand.css').toString();

function rotationDegrees(clockHand) {
    const { currentTick, tickCount } = clockHand;
    // return 90;
    return R.multiply(currentTick, R.divide(360, tickCount));
}

const HAND_CLASS = 'analog-clock-hand__hand';

export default class AnalogClockHand extends HTMLElement {
    static get observedAttributes() {
        return [
            'positions',
            'current-tick',
        ];
    }

    static constructContent(instance) {
        const shadowRoot = instance.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = styleString;
        shadowRoot.appendChild(style);

        // const hand = document.createElement('div');
        // hand.classList.add(HAND_CLASS);
        // shadowRoot.appendChild(hand);
    }

    constructor() {
        super();
        this._currentTick = 0;

        this.constructor.constructContent(this);
        console.log(this.shadowRoot.querySelector('div'));
    }

    // connectedCallback() {
    //     console.log('hand connected');
    // }

    attributeChangedCallback() {
        console.log('attrChange');
        this.updateStyle();
    }

    sayHello() {
        console.log('hello!');
    }

    updateStyle() {
        console.log(rotationDegrees(this));
        // What the fuck is my document context gonna even be here?
        const hand = document.getElementsByClassName(HAND_CLASS);
        // transform rotation = rotationDegees(this);
    }

    /**
     * Increase the current tick by amount. Returns the overflow amount.
     *
     * @param {number} amount
     * @returns {number}
     */
    tick(amount = 1) {
        this.currentTick += amount;
    }

    set currentTick(value) {
        const newTick = R.mathMod(value, this._currentTick);
        this.setAttribute('current-tick', newTick);
        this.updateStyle();
    }

    get currentTick() {
        return this._currentTick;
    }

    get tickCount() {
        return Number(this.getAttribute('positions'));
    }
}

window.customElements.define('analog-clock-hand', AnalogClockHand);
