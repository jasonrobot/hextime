import {
    HexTime,
} from './converter';

const midnight = new Date('2000-1-1');

describe('converter', () => {
    beforeEach(() => {
        midnight.setUTCHours(0);
    });

    describe('h1', () => {
        it('should work, right?', () => {
            const ht = new HexTime(midnight);
            expect(ht).toBeDefined();
        });

        it('should show 12 hours as 7 h1', () => {
            midnight.setUTCHours(12);
            const ht = new HexTime(midnight);
            expect(ht.times[0]).toEqual(8);
        });
    });

    describe('h2', () => {
        it('should show midnight as 0 h2', () => {
            midnight.setUTCHours(1);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(2);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(3);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(4);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(5);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(6);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(7);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(8);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(9);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(10);
            console.log((new HexTime(midnight)).times);
            midnight.setUTCHours(11);
            console.log((new HexTime(midnight)).times);
        });
    });
});
