import * as R from 'ramda';

function rotationDegrees(clockHand) {
    const { currentTick, tickCount } = clockHand;
    return 90;
    return R.multiply(currentTick, R.divide(360, tickCount));
}

export default class ClockHand extends HTMLElement {
    static get observedAttributes() {
        return [
            'positions',
            'current-tick',
        ];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        R.pipe(
            R.map(R.bind(document.createElement, document)),
            R.forEach(R.bind(shadowRoot.appendChild, shadowRoot)),
        )(['style', 'div']);

        this._currentTick = 0;
    }

    connectedCallback() {
        // console.log('hand connected');
    }

    attributeChangedCallback() {
        // console.log('attrChange');
        this.updateStyle();
    }

    updateStyle() {
        console.log(rotationDegrees(this));
        this.shadowRoot.querySelector('style').textContent = `
.hand {
    transform: rotate(${rotationDegrees(this)}deg);
}
`;
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

window.customElements.define('clock-hand', ClockHand);
