/**
 * converter.js
 *
 * Handles conversion of times between 24:60:60.100 to F:F:F-F.F.
 * (That is, between normal time and hexadecimal time.)
 */

import {
    add,
    // ap,
    // call,
    compose,
    cond,
    divide,
    equals,
    flip,
    head,
    invoker,
    is,
    juxt,
    map,
    mathMod,
    // nth,
    // modulo,
    multiply,
    // prop,
    reduce,
    type,
    zipWith,
} from 'ramda';

const {
    floor,
} = Math;

export const msOfDay = compose(flip(mathMod)(86400000), invoker(0, 'getTime'));

/**
 * (conversionFactor : number) -> (Date) -> number
 */
const hh = factor => compose(
    floor,
    flip(mathMod)(16),
    flip(divide)(factor),
    msOfDay,
);

const conversionFactors = [
    5400000,
    675000 / 2,
    675000 / 32,
    675000 / 512,
    675000 / 8192,
];

// makeHexTime :: Date => [number]
const makeHexTime = juxt(map(hh, conversionFactors));

const hexToMillis = compose(
    reduce(add, 0),
    zipWith(multiply, conversionFactors),
);

export class HexTime {
    static fromDateObject(date) {
        return makeHexTime(date);
    }

    constructor(...args) {
        cond([
            [
                is(Date, head(args)),
                this.times = this.constructor.fromDateObject(head(args)),
            ],
            [map(equals(type('Number')), args)],
        ]);
        console.log(`ctor'd ${args} to ${this.times}`);
    }

    /* eslint-disable class-methods-use-this */
    /**
     * Use a setter with no effect to prevent setting this.times directly.
     */
    // set times(_) {
    //     throw new Error('Don\'t set times directly.');
    // }
    /* eslint-enable class-methods-use-this */

    toDate() {
        return new Date((new Date()).getTime() + hexToMillis(this.times));
    }
}
