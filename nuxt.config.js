export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Petitelaine',
    htmlAttrs: {
      lang: 'en',
      'data-theme': 'garden',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['animate.css/animate.min.css'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        flag: '🇬🇧',
      },
      {
        code: 'fr',
        name: 'Français',
        flag: '🇫🇷',
      },
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
    vueI18n: {
      fallbackLocale: ['en', 'fr'],
      messages: {
        en: {
          chooseUsername: 'Choose a username',
          Players: 'Players',
          waitPlayers: 'Waiting for more players...',
          startGame: 'Start the game',
          restartGame: 'Restart',
          invite: 'Invite',
          yourWord: 'Your word',
          currentTurn: 'Your word',
          yourTurn: "it's your turn",
          waitingForCurrentPlayer: 'Waiting for current player...',
          submit: 'Submit',
          timeVote: "It's time to vote !!!",
          vote: 'Vote',
          win: 'You win 😄',
          loose: 'You loose 😓',
          draw: "It's draw 😱",
          wordsWere: 'Words were',
          imposterWas: 'The imposter was',
          youWereImposter: 'You were the imposter',
        },
        fr: {
          chooseUsername: 'Choisi un pseudo',
          Players: 'Joueurs',
          waitPlayers: "En attente d'autres joueurs...",
          startGame: 'Lancer la partie',
          restartGame: 'Relancer',
          invite: 'Inviter',
          yourWord: 'Ton mot',
          currentTurn: 'Au tour de',
          yourTurn: "C'est ton tour",
          waitingForCurrentPlayer: 'En attente du joueur de jouer...',
          submit: 'Valider',
          timeVote: 'Il est temps de voter !!!',
          vote: 'Vote',
          win: 'Tu as gagné 😄',
          loose: 'Tu as perdu 😓',
          draw: 'Égalité 😱',
          and: 'et',
          wordsWere: 'Les mots étaient',
          imposterWas: "L'imposteur était",
          youWereImposter: 'You were the imposter',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
