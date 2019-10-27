import * as R from 'ramda';

function rotationDegrees(clockHand) {
    const { tick, tickCount } = clockHand;
    R.multiply(tick, R.divide(360, tickCount));
}

export default class ClockHand extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        R.pipe(
            R.map(R.bind(document.createElement, document)),
            R.forEach(R.bind(shadowRoot.appendChild, shadowRoot)),
        )(['style', 'div']);

        // shadowRoot.appendChild(document.createTextNode('hand'));
    }

    updateStyle() {
        this.shadowRoot.querySelector('style').textContent = `
.hand {
    transform: rotate(${rotationDegrees(this)}deg);
}
`;
    }

    set tick(value) {
        this.currentTick = R.mathMod(value, this.currentTick);
        this.updateStyle();
    }

    get tick() {
        return this.currentTick;
    }
}

window.customElements.define('clock-hand', ClockHand);
