"use strict";

var cards = require("./cards");
var hands = require("./hands");

function getPlayerWithBestHand() {
  bestPlayer = null;
  bestHand = null;

  for (var i = 0; i < players.length; i++) {
    var playerCards = players[i].pocketCards.slice(0);

    var hand = hands.getBestHand(playerCards);
    console.log(players[i])
    if (!bestPlayer || !bestHand) {
      bestPlayer = players[i];
      bestHand = hand;
      continue;
    }

    if (hand.value > bestHand.value) {
      bestPlayer = players[i];
      bestHand = hand;
      continue;
    }

    if(hand.value === bestHand.value){
        let newbestHand = hands.compare(bestPlayer,players[i])
        if(newbestHand === players[i]){
            bestPlayer = players[i];
            bestHand = hand 
        }
        continue
    }
    
  }

  return bestPlayer;
}

function echoBestPlayer(round) {
  getPlayerWithBestHand();
  console.log(
    `After the ${round}, ${bestPlayer.name} is winning with a ${hands.getName(
      bestHand.value
    )} card :- ${bestHand.cards[0].name} `
  );
}

var players = [
  { name: "Amit" },
  { name: "Anil" },
  { name: "Aman" },
  { name: "Messi" },
];

var bestPlayer = null;
var bestHand = null;

var deck = cards.shuffle();

for (var i = 0; i < players.length; i++) {
  players[i].pocketCards = deck.splice(0, 3);
}
echoBestPlayer("deal");
