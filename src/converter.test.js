import {
    h1,
    h2,
} from './converter';

const midnight = new Date('2000-1-1');

describe('converter', () => {

    beforeEach(() => {
        midnight.setUTCHours(0);
    });

    describe('h1', () => {
        it('should work, right?', () => {
            expect(h1(midnight)).toEqual(0);
        });

        it('should show 12 hours as 7 h1', () => {
            midnight.setUTCHours(12);
            expect(h1(midnight)).toEqual(8);
        });
    });

    describe('h2', () => {
        it('should show midnight as 0 h2', () => {
            expect(h2(midnight)).toEqual(0);
        });
    });
});
