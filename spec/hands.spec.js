var hands = require('../hands');
var cards = require('../cards');

describe('hands spec', () => {

    it('can detect a high card', () => {
        var myhand = [ cards.toCard('seven'), cards.toCard('three'), cards.toCard('four')];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.HIGH_CARD);
    });

    it('can detect a pair as the highest hand', () => {
        var myhand = [ cards.toCard('three'), cards.toCard('three'), cards.toCard('four') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.PAIR);
    });
    it('can detect a three trail', () => {
        var myhand = [ cards.toCard('seven'), cards.toCard('seven'), cards.toCard('seven') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.THREE_TRAIL);
    });

    it('can detect a order', () => {
        var myhand = [ cards.toCard('three'), cards.toCard('two'), cards.toCard('ace') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.ORDER);
    });
   

});