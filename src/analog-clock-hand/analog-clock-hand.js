import * as R from 'ramda';

const styleString = require('./analog-clock-hand.css').toString();

function rotationDegrees(clockHand) {
    const { currentTick, tickCount } = clockHand;
    // return 90;
    return R.multiply(currentTick, R.divide(360, tickCount));
}

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
    }

    constructor() {
        super();
        this._currentTick = 0;

        this.constructor.constructContent(this);

        this._initialTransform = this.style.getPropertyValue('transform');
    }

    set currentTick(value) {
        const newTick = R.mathMod(value, this.tickCount);
        this.setAttribute('current-tick', newTick);
    }

    get currentTick() {
        return Number(this.getAttribute('current-tick'));
    }

    get tickCount() {
        return Number(this.getAttribute('positions'));
    }

    attributeChangedCallback() {
        // console.log('attrChange');
        this.updateStyle();
    }

    updateStyle() {
        const deg = rotationDegrees(this);
        const transform = `rotate(${deg}deg)`;
        this.style.setProperty('transform', transform);
    }

    /**
     * Increase the current tick by amount. Returns the overflow amount.
     *
     * @param {number} amount
     * @returns {number}
     */
    tick(amount = 1) {
        this.currentTick = this.currentTick + amount;
        return this.currentTick;
    }
}

window.customElements.define('analog-clock-hand', AnalogClockHand);
