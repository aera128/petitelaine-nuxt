<template>
  <div>
    <button
      class="
        btn btn-lg
        font-black
        mb-10
        rounded-box
        animate__animated animate__fadeInDown
      "
      v-if="room.sessionId === state.leader"
      @click="backToLobby"
    >
      Lobby
    </button>
    <div
      class="
        card
        shadow-2xl
        lg:card-side
        animate__animated animate__fadeInDown
        min-h-16
      "
    >
      <div class="card-body bg-base-100 grid grid-cols-2">
        <div class="font-black text-2xl">
          {{ $t('yourWord') }} : {{ state.players.get(room.sessionId).word }}
        </div>
        <div
          class="font-black text-2xl text-right"
          v-if="state.turns[state.currentTurn] !== room.sessionId"
        >
          {{ $t('currentTurn') }} :
          {{ state.players.get(state.turns[state.currentTurn]).username }}
        </div>
        <div class="font-black text-2xl text-right" v-else>
          {{ $t('yourTurn') }}
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
      v-if="room.sessionId === state.turns[state.currentTurn]"
    >
      <form
        class="card-body bg-base-100 grid grid-cols-4 gap-4"
        @submit.prevent="sendWord(true)"
      >
        <input
          v-model="word"
          type="text"
          :placeholder="$t('yourWord')"
          class="
            input input-lg input-bordered
            rounded-box
            w-full
            font-black
            text-2xl
            lg:col-span-3
            col-span-4
          "
          max="50"
        />
        <button
          class="
            btn btn-lg
            rounded-box
            font-black
            text-2xl
            lg:col-span-1
            col-span-4
          "
          type="submit"
        >
          {{ $t('submit') }}
        </button>
      </form>
    </div>
    <div
      class="
        card
        shadow-2xl
        lg:card-side
        animate__animated animate__fadeInDown
        mt-10
      "
      v-else
    >
      <div class="card-body bg-base-100">
        <div
          class="font-black text-2xl w-full my-4 pl-5"
          v-if="
            ![null, '', undefined].includes(
              state.players.get(state.turns[state.currentTurn]).words[
                state.round
              ]
            )
          "
        >
          <span
            v-for="(letter, i) in state.players.get(
              state.turns[state.currentTurn]
            ).words[state.round]"
            :key="i"
            class="inline-block animate__animated animate__bounceIn"
          >
            {{ letter.replace(' ', '&nbsp;') }}
          </span>
        </div>
        <div class="font-black text-2xl w-full my-4 pl-5 text-gray-400" v-else>
          {{ $t('waitingForCurrentPlayer') }}
        </div>
      </div>
    </div>
    <div
      class="
        card
        shadow-2xl
        lg:card-side
        animate__animated animate__fadeInDown
        my-10
      "
    >
      <div class="card-body bg-base-100">
        <div class="text-2xl font-black">
          {{ $t('Players') }} :
          <span>{{ state.players.size }}</span>
        </div>
        <div class="grid lg:grid-cols-2 gap-5 mt-5">
          <div
            :class="
              'card bg-base-300 shadow-inner transition-all duration-300' +
              (state.currentTurn === i ? ' border-4 border-red-600' : '')
            "
            v-for="(key, i) in state.turns"
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
                        :src="`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${
                          state.players.get(key).avatar
                        }`"
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
  data() {
    return {
      word: null,
      errors: null,
    }
  },
  methods: {
    sendWord(submit) {
      this.errors = null
      if (submit) {
        if (this.word) {
          if (this.word.length > 0) {
            this.room.send('write', { word: this.word, submit: submit })
            this.word = null
          }
        }
      } else {
        this.room.send('write', { word: this.word, submit: submit })
      }
    },
    kickPlayer(playerId) {
      if (this.room.sessionId === this.state.leader) {
        this.room.send('kickPlayer', playerId)
      }
    },
    backToLobby() {
      if (this.room.sessionId === this.state.leader) {
        this.room.send('backToLobby')
      }
    },
  },
  watch: {
    word() {
      if (this.word) {
        this.word = this.word.slice(0, 50)
        this.word = this.word.charAt(0).toUpperCase() + this.word.slice(1)
      }
      if (this.room.sessionId === this.state.turns[this.state.currentTurn]) {
        this.sendWord(false)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
