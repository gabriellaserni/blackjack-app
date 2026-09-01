// Gera um baralho completo no mesmo formato do mock da API
// https://deckofcardsapi.com

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
  { key: "0", name: "10" },
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

// Embaralha o baralho
export function shuffledDeck() {
  const deck = buildDeck();

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

// Compra cartas aleatórias
export function drawRandomCards(quantity, excludedCards = []) {
  const excludedCodes = new Set(
    excludedCards.map((card) => card.code)
  );

  const availableCards = shuffledDeck().filter(
    (card) => !excludedCodes.has(card.code)
  );

  return availableCards.slice(0, quantity);
}

// Converte o valor da carta em pontos
export function cardPoints(value) {
  if (value === "ACE") return 11;

  if (["JACK", "QUEEN", "KING"].includes(value)) {
    return 10;
  }

  return Number(value);
}

// Calcula a pontuação da mão no Blackjack
export function calculateHandScore(cards) {
  let total = cards.reduce(
    (sum, card) => sum + cardPoints(card.value),
    0
  );

  let aces = cards.filter(
    (card) => card.value === "ACE"
  ).length;

  // Se passou de 21, transforma Ás de 11 em 1
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}