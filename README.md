# Blackjack Lounge

## Objetivo do Projeto

Este projeto tem como objetivo colocar em prática a criação de um ambiente React moderno utilizando o **Vite**, partindo de um projeto limpo (sem os componentes, assets e estilos padrão do template inicial) e customizado com um tema visual próprio.

## Tema Visual do Jogo

O tema escolhido é o de uma mesa de **Blackjack (21)**, com visual inspirado em cassinos: tons escuros de vermelho remetendo ao veludo das mesas de jogo, contrastando com um dourado de destaque para elementos importantes (botões, títulos e pontuação).

## Paleta de Cores

| Uso | Cor | Hex |
|---|---|---|
| Primária | 🟥 | `#991B1B` |
| Secundária | 🟧 | `#F87171` |
| Fundo da mesa | 🟥 | `#450A0A` |
| Texto | ⬜ | `#FEF2F2` |
| Destaque (Accent) | 🟨 | `#FACC15` |
| Raio de borda | — | `8px` |

## Regra do Blackjack (21)

O Blackjack, também conhecido como "21", é um jogo de cartas jogado entre o jogador e o dealer (a casa). O objetivo é fazer com que a soma dos valores das cartas na mão chegue o mais próximo possível de **21 pontos**, sem ultrapassar esse valor (o que é chamado de "estourar" ou *bust*).

- Cartas numéricas valem seu número de face.
- Cartas de figura (J, Q, K) valem **10 pontos**.
- O Ás vale **1 ou 11 pontos**, o que for mais vantajoso para a mão.
- Se o jogador ultrapassar 21 pontos, perde automaticamente.
- Se o jogador fizer exatamente 21 pontos com as duas primeiras cartas (um Ás + uma carta de valor 10), tem um **Blackjack**, a melhor mão do jogo.
- Vence quem ficar mais próximo de 21 sem estourar, comparando a mão do jogador com a do dealer.


### Componentes criados

- **Header** — título do jogo, nome/RM da autora, mensagem de status da
  rodada e botão de alternar tema claro/escuro.
- **ScoreBoard** — exibe a pontuação do jogador e do dealer.
- **GameTable** — desenha a mesa: mão do dealer e mão do jogador.
- **Card** — exibe uma única carta (ou o verso, quando oculta).
- **Button** — botão reutilizável, usado em Hit, Stand e Nova rodada.

### Mock de dados

O baralho é gerado no mesmo formato do `mock.json` fornecido no exercício
(`code`, `image`, `images`, `value`, `suit`), simulando o retorno da API
[deckofcardsapi.com](https://deckofcardsapi.com).

### Comunicação via Props

- `App.jsx` é o único componente com estado (`useState`) — guarda as cartas,
  o placar e o status da rodada.
- `ScoreBoard` recebe `playerScore` e `dealerScore` via props e só exibe.
- `GameTable` recebe os arrays `dealerCards` e `playerCards` e repassa cada
  carta individualmente para `Card` via props (`card`, `hidden`).
- `Button` é reutilizado três vezes (Hit, Stand, Nova rodada), recebendo
  `label`, `onClick` e `variant` diferentes por props a cada uso.
- `Header` recebe `status` (texto dinâmico da rodada) e
  `onToggleTheme`/`isLightTheme` para o botão de tema.

### Estilização

Cada componente tem seu próprio arquivo `.css`, e todas as cores/raio de
borda vêm de variáveis CSS centralizadas em `src/index.css`, seguindo a
paleta da tabela acima. O layout é responsivo via `flex-wrap` e uma media
query em 480px para telas de celular.


## Aluno(a)

- **Nome:** Gabriella Serni Ponzetta
- **RM:** 566296
