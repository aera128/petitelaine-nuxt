<template>
  <div class="pb-10">
    <div
      class="card shadow-2xl lg:card-side animate__animated animate__fadeInDown"
    >
      <div class="card-body bg-base-100">
        <div class="font-black text-3xl text-center">
          <span
            class="text-red-600"
            v-if="
              (state.imposter === room.sessionId && state.winner === 0) ||
              (state.imposter !== room.sessionId && state.winner === 1)
            "
          >
            You Lose :(
          </span>
          <span class="text-yellow-600" v-if="state.winner === 2">
            It's a draw !
          </span>
          <span
            class="text-green-600"
            v-if="
              (state.imposter === room.sessionId && state.winner === 1) ||
              (state.imposter !== room.sessionId && state.winner === 0)
            "
            >You win :)
          </span>
        </div>
      </div>
    </div>
    <div
      class="
        card
        shadow-2xl
        lg:card-side
        animate__animated animate__fadeInDown
        mt-10
      "
      v-if="room.sessionId === state.leader"
    >
      <div class="card-body bg-base-100 grid lg:grid-cols-2 gap-4">
        <button
          class="btn btn-lg rounded-box font-black text-xl"
          @click="backToLobby"
        >
          Lobby
        </button>
        <button
          class="btn btn-lg rounded-box font-black text-xl"
          @click="restart"
        >
          Restart
        </button>
      </div>
    </div>
    <div
      class="
        card
        shadow-2xl
        lg:card-side
        animate__animated animate__fadeInDown
        mt-10
      "
    >
      <div class="card-body bg-base-100 grid lg:grid-cols-2">
        <div
          class="font-black text-3xl"
          v-if="room.sessionId !== state.imposter"
        >
          The imposter was
          <span class="text-red-600">{{
            state.players.get(state.imposter).username
          }}</span>
          !
        </div>
        <div v-else class="font-black text-3xl">You were the imposter</div>
        <div class="font-black text-3xl lg:text-right">
          Words were {{ state.words[0] }} and {{ state.words[1] }}
        </div>
      </div>
    </div>
    <div
      class="
        card
        shadow-2xl
        lg:card-side
        animate__animated animate__fadeInDown
        mt-10
      "
    >
      <div class="card-body bg-base-100 grid lg:grid-cols-2 lg:gap-4 gap-10">
        <div>
          <div class="font-black text-2xl mb-5">
            Crewmates :
            <span v-if="state.winner === 0" class="text-green-600">Win</span>
            <span v-if="state.winner === 1" class="text-red-600">Lose</span>
            <span v-if="state.winner === 2" class="text-yellow-400">Draw</span>
          </div>
          <div class="space-x-4 mb-7">
            <div
              class="avatar animate__animated animate__bounceIn"
              v-for="player in crewmates"
              :key="player[0]"
            >
              <div class="w-24 h-24 filter drop-shadow">
                <img
                  :src="
                    'https://avatars.dicebear.com/api/bottts/' +
                    player[1].avatar +
                    '.svg'
                  "
                />
              </div>
              <div
                class="font-black text-center w-full absolute top-24 break-all"
              >
                {{ player[1].username }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="font-black text-2xl mb-5">
            Imposter :
            <span v-if="state.winner === 1" class="text-green-600">Win</span>
            <span v-if="state.winner === 0" class="text-red-600">Lose</span>
            <span v-if="state.winner === 2" class="text-yellow-400">Draw</span>
          </div>
          <div class="space-x-4 mb-7">
            <div
              class="avatar animate__animated animate__bounceIn"
              v-for="player in imposter"
              :key="player[0]"
            >
              <div class="w-24 h-24 filter drop-shadow">
                <img
                  :src="
                    'https://avatars.dicebear.com/api/bottts/' +
                    player[1].avatar +
                    '.svg'
                  "
                />
              </div>
              <div
                class="font-black text-center w-full absolute top-24 break-all"
              >
                {{ player[1].username }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      tabindex="0"
      class="
        collapse
        w-full
        border
        rounded-box
        shadow-2xl
        mt-10
        bg-base-100
        collapse-arrow
        animate__animated animate__fadeInDown
      "
    >
      <div class="collapse-title text-2xl font-black">Details</div>
      <div class="collapse-content transition-all duration-300">
        <div class="grid lg:grid-cols-2 gap-5 mt-5">
          <div
            class="card bg-base-300 shadow-inner"
            v-for="key in state.turns"
            :key="key"
          >
            <div class="card-body">
              <div
                class="font-black text-2xl flex items-center justify-between"
              >
                <div class="flex items-center">
                  <div
                    class="avatar mr-2 mb-2 animate__animated animate__bounceIn"
                  >
                    <div class="rounded-btn w-24 h-24">
                      <img
                        :src="
                          'https://avatars.dicebear.com/api/bottts/' +
                          state.players.get(key).avatar +
                          '.svg'
                        "
                      />
                    </div>
                  </div>
                  <span
                    v-if="room.sessionId === key"
                    class="animate__animated animate__bounceIn"
                    >{{ state.players.get(key).username }}</span
                  >
                  <span
                    class="
                      animate__animated animate__bounceIn
                      text-gray-500
                      hover:text-current
                      transition-colors
                      duration-300
                    "
                    v-else
                  >
                    {{ state.players.get(key).username }}
                  </span>
                </div>
                <div class="animate__animated animate__bounceIn">
                  <span
                    v-if="
                      room.sessionId === state.leader && room.sessionId !== key
                    "
                    ><button
                      class="btn font-black rounded-box"
                      @click="kickPlayer(key)"
                    >
                      kick
                    </button>
                  </span>
                  {{ key === state.leader ? '👑' : '🎮' }}
                </div>
              </div>
              <div class="font-black text-xl">
                Word : {{ state.players.get(key).word }}
              </div>
              <ul class="font-black text-xl mt-2">
                <li v-for="(word, i) in state.players.get(key).words" :key="i">
                  {{ i + 1 }}.
                  <span
                    v-for="(letter, j) in word"
                    :key="j"
                    class="inline-block animate__animated animate__backInUp"
                  >
                    {{ letter.replace(' ', '&nbsp;') }}
                  </span>
                </li>
              </ul>
              <div
                class="justify-end card-actions font-black"
                v-if="state.players.get(key).votes.length > 0"
              >
                <div>Votes :</div>
                <div
                  v-for="k in state.players.get(key).votes"
                  :key="k"
                  class="
                    badge badge-md
                    mt-2
                    animate__animated animate__backInUp
                  "
                >
                  {{ state.players.get(k).username }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
    },
    room: {
      type: Object,
    },
  },
  methods: {
    restart() {
      if (this.room.sessionId === this.state.leader) {
        this.room.send('restart')
      }
    },
    backToLobby() {
      if (this.room.sessionId === this.state.leader) {
        this.room.send('backToLobby')
      }
    },
    kickPlayer(playerId) {
      if (this.room.sessionId === this.state.leader) {
        this.room.send('kickPlayer', playerId)
      }
    },
  },
  computed: {
    crewmates() {
      return new Map(
        [...this.state.players].filter((p) => {
          return p[0] !== this.state.imposter
        })
      )
    },
    imposter() {
      return new Map(
        [...this.state.players].filter((p) => {
          return p[0] === this.state.imposter
        })
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
