<template>
  <div class="pb-10">
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
      <div class="card-body bg-base-100">
        <div class="font-black text-3xl text-center">{{ $t('timeVote') }} </div>
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
      <div class="card-body bg-base-100">
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
              <div class="justify-end card-actions">
                <button
                  class="btn btn-lg font-black rounded-box"
                  @click="vote(key)"
                  v-if="!voted"
                >
                  {{ $t('vote') }} 
                </button>
              </div>
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
  data() {
    return {
      voted: false,
    }
  },
  methods: {
    vote(id) {
      if (!this.voted) {
        this.room.send('vote', { id: id })
        this.voted = true
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
}
</script>

<style lang="scss" scoped></style>
