
const API_URL = 'https://deckofcardsapi.com/api/deck'

async function request(url) {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Erro de comunicação com a API.')
    }

    const data = await response.json()

    if (!data.success) {
        throw new Error(data.error || 'A API retornou um erro.')
    }

    return data
}

export async function createDeck() {
    const data = await request(`${API_URL}/new/`)
    return data.deck_id
}

export async function shuffleDeck(deckId) {
    return request(`${API_URL}/${deckId}/shuffle/`)
}

export async function drawCards(deckId, quantity = 1) {
    const data = await request(
        `${API_URL}/${deckId}/draw/?count=${quantity}`
    )

    return data.cards
}

