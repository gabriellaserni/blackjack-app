// Gera um baralho completo no mesmo formato do mock (1).json que veio da API
// https://deckofcardsapi.com — cada carta: { code, image, images, value, suit }

const SUITS = [
  { key: "S", name: "SPADES" },
  { key: "H", name: "HEARTS" },
  { key: "D", name: "DIAMONDS" },
  { key: "C", name: "CLUBS" },
];

const VALUES = [
  { key: "A", name: "ACE" },
  { key: "2", name: "2" },
  { key: "3", name: "3" },
  { key: "4", name: "4" },
  { key: "5", name: "5" },
  { key: "6", name: "6" },
  { key: "7", name: "7" },
  { key: "8", name: "8" },
  { key: "9", name: "9" },
  { key: "0", name: "10" }, // a API usa "0" pro código do 10
  { key: "J", name: "JACK" },
  { key: "Q", name: "QUEEN" },
  { key: "K", name: "KING" },
];

function buildDeck() {
  const deck = [];
  SUITS.forEach((suit) => {
    VALUES.forEach((value) => {
      const code = `${value.key}${suit.key}`;
      deck.push({
        code,
        image: `https://deckofcardsapi.com/static/img/${code}.png`,
        images: {
          svg: `https://deckofcardsapi.com/static/img/${code}.svg`,
          png: `https://deckofcardsapi.com/static/img/${code}.png`,
        },
        value: value.name,
        suit: suit.name,
      });
    });
  });
  return deck;
}

export function shuffledDeck() {
  const deck = buildDeck();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Converte o "value" da carta (ex: "QUEEN", "10", "ACE") em pontos do Blackjack
export function cardPoints(value) {
  if (value === "ACE") return 11;
  if (["JACK", "QUEEN", "KING"].includes(value)) return 10;
  return Number(value);
}

// Soma a mão tratando o Ás como 1 quando estourar 21
export function handTotal(cards) {
  let total = cards.reduce((sum, c) => sum + cardPoints(c.value), 0);
  let aces = cards.filter((c) => c.value === "ACE").length;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}