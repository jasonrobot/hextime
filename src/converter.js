/**
 * converter.js
 *
 * Handles conversion of times between 24:60:60.100 to F:F:F-F.F.
 * (That is, between normal time and hexadecimal time.)
 */

import {
    __,
    // call,
    compose,
    curry,
    divide,
    // flip,
    invoker,
    // map,
    mathMod,
    // modulo,
    // multiply,
    // prop,
} from 'ramda';
// Ramda doesn't have it, but I want it.
const fmap = curry((fns, args) => fns.map(fn => fn(args)));

const {
    floor,
} = Math;

// function millisecondOfDay(date) { return modulo(date.getTime(), 86400000); }

export const msOfDay = compose(mathMod(__, 86400000), invoker(0, 'getTime'));

// const mod16 = flip(modulo)(16);
// const divmod16 = compose(floor, flip(modulo)(16), flip(divide)(16));

/**
 * (conversionFactor : number) -> (Date) -> number
 */
// kinda hate this implementation
// const hh = compose(
//     curry(compose(
//         floor,
//         flip(modulo)(16),
//         flip(divide),
//     )),
//     msOfDay,
// );
const hh = factor => compose(
    floor,
    mathMod(__, 16),
    divide(__, factor),
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
export const makeHexTime = fmap([h1, h2, h3, h4, h5]);

export const convertHMStoHex = (h, m, s) => makeHexTime(new Date(h, m, s));
