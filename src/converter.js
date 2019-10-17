/**
 * converter.js
 *
 * Handles conversion of times between 24:60:60.100 to F:F:F-F.F.
 * (That is, between normal time and hexadecimal time.)
 */

import {
    // ap,
    // call,
    compose,
    divide,
    flip,
    invoker,
    juxt,
    // map,
    mathMod,
    // modulo,
    // multiply,
    // prop,
} from 'ramda';

const {
    floor,
} = Math;

export const msOfDay = compose(flip(mathMod)(86400000), invoker(0, 'getTime'));

// const mod16 = flip(modulo)(16);
// const divmod16 = compose(floor, flip(modulo)(16), flip(divide)(16));

/**
 * (conversionFactor : number) -> (Date) -> number
 */
const hh = factor => compose(
    floor,
    flip(mathMod)(16),
    flip(divide)(factor),
    msOfDay,
);

// h1 :: (Date) -> number
export const h1 = hh(5400000);
// h2 :: (Date) -> number
export const h2 = hh(675000 / 2);
// h3 :: (Date) -> number
export const h3 = hh(675000 / 32);
// h4 :: (Date) -> number
export const h4 = hh(675000 / 512);
// h5 :: (Date) -> number
export const h5 = hh(675000 / 8192);

// const mht = d => map(flip(call)(d), [h1, h2, h3, h4, h5]);
// const mht = d => map(f => f(d), [h1, h2, h3, h4, h5]);
export const makeHexTime = juxt([h1, h2, h3, h4, h5]);

export const convertHMStoHex = (h, m, s) => makeHexTime(new Date(h, m, s));

export const convertHexToHMS = (h1, h2, h3, h4, h5 = 0) => {
};

