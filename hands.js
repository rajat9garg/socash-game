"use strict";

const THREE_TRAIL = 4;
const ORDER = 3;
const PAIR = 2;
const HIGH_CARD = 1;

const HANDS = [THREE_TRAIL, HIGH_CARD, ORDER, PAIR];

function getName(val) {
  switch (val) {
    case PAIR:
      return "pair";
    case HIGH_CARD:
      return "high card";
    case ORDER:
      return "order";
    case THREE_TRAIL:
      return "three trail";
  }

  throw new Error("I have no idea what a " + val + " is");
}

function getBestHand(cards) {
  var hand = getThreeTrail(cards);

  if (!hand) {
    hand = getOrder(cards);
  }

  if (!hand) {
    hand = getPair(cards);
  }

  if (!hand) {
    hand = getHighCard(cards);
  }
  return hand;
}

function getThreeTrail(cards) {
  if (!cards || cards.length !== 3) {
    return null;
  }
  if (cards[0].value === cards[1].value && cards[1].value === cards[2].value) {
    return { value: THREE_TRAIL, cards: cards };
  }
  return null;
}

function getOrder(cards) {
  cards = sort(cards);
  if (!cards || cards.length !== 3) {
    return null;
  }
  let minValue;
  let flag = true;
  for (let i = 0; i < cards.length; i++) {
    if (!minValue) {
      minValue = cards[i].value;
      continue;
    }
    if (minValue + 1 !== cards[i].value) {
      flag = false;
    }
    minValue = cards[i].value;
  }
  if (flag) {
    return { value: ORDER, cards: cards };
  }
  return null;
}
function getHighCard(cards) {
  var idx = -1;
  let val = -1;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].isAce === true) {
      idx = i;
      break;
    }
    if (cards[i].value > val) {
      idx = i;
      val = cards[i].value;
    }
  }
  return { value: HIGH_CARD, cards: [cards[idx]] };
}

function compare(cards, cards2) {
  let play1 = getHighCard(cards.pocketCards);
  let play2 = getHighCard(cards2.pocketCards);
  if(play1.cards[0].value === 1 && play2.cards[0].value !==1){
      return cards
  }
  if(play2.cards[0].value === 1 && play1.cards[0].value !==1){
    return cards2
}
  if (play1.cards[0].value > play2.cards[0].value) {
    return cards;
  }
  return cards2;
}

function sort(cards) {
  var sorted = cards.sort((obj1, obj2) => {
    if (obj1.value < obj2.value) {
      return -1;
    } else if (obj1.value > obj2.value) {
      return 1;
    }
    return 0;
  });

  return sorted;
}

function getPair(cards) {
  var matches = {};

  for (var i = 0; i < cards.length; i++) {
    if (!matches[cards[i].value]) {
      matches[cards[i].value] = [];
    }
    matches[cards[i].value].push(cards[i]);
  }

  var pair = null;

  Object.keys(matches).forEach((val, idx) => {
    var cards = matches[val];
    if (cards.length == 2) {
      pair = cards;
      return;
    }
  });

  if (pair && pair.length == 2) {
    return { value: PAIR, cards: pair };
  }

  return null;
}

module.exports = {
  getBestHand: getBestHand,
  getPair: getPair,
  getHighCard: getHighCard,
  getName: getName,
  compare: compare,
  THREE_TRAIL : THREE_TRAIL,
  ORDER : ORDER,
  PAIR : PAIR,
  HIGH_CARD : HIGH_CARD
};
