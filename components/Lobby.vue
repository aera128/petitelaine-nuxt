<template>
  <div>
    <div
      class="card shadow-2xl lg:card-side animate__animated animate__fadeInDown"
    >
      <div class="card-body bg-base-100">
        <div class="text-2xl font-black">
          Players :
          <span v-if="state.players.size > 2">{{ state.players.size }}</span
          ><span v-else class="text-red-600">{{ state.players.size }}</span> /
          {{ state.settings.maxPlayers }}
          <span class="flex items-center mt-2 -ml-4">
            <button
              class="btn btn-ghost btn-xl loading hidden lg:flex"
            ></button>
            Waiting for more players...
          </span>
        </div>
        <select
          v-if="room.sessionId === state.leader"
          v-model="settings.maxPlayers"
          class="
            select select-bordered select-lg
            border-gray-500
            rounded-box
            mt-5
            font-black
          "
          @change="changeSettings"
        >
          <option
            :value="n"
            v-for="n in [5, 10, 15, 20, 30, 50].filter((n) => {
              return n >= state.players.size
            })"
            :key="n"
            class="font-black"
          >
            {{ n }} players
          </option>
        </select>
        <ul class="border border-gray-500 rounded-box py-5 px-2 mt-5">
          <li
            v-for="key in state.players.keys()"
            :key="key"
            class="font-black text-xl flex items-center justify-between"
          >
            <div class="flex items-center">
              <div class="avatar mr-2 mb-2 animate__animated animate__bounceIn">
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
                v-if="room.sessionId === state.leader && room.sessionId !== key"
                ><button
                  class="btn font-black rounded-box"
                  @click="kickPlayer(key)"
                >
                  kick
                </button>
              </span>
              {{ key === state.leader ? '👑' : '🎮' }}
            </div>
          </li>
        </ul>
        <div
          class="grid lg:grid-cols-2 gap-4 mt-5"
          v-if="room.sessionId === state.leader"
        >
          <button class="btn btn-lg rounded-box mr-2" @click="copyToClipboard">
            📋 - Invite
          </button>
          <button
            class="btn btn-lg rounded-box"
            @click="startGame"
            v-if="state.players.size > 2"
          >
            ▶️ - Start the game
          </button>
          <button
            class="btn btn-lg rounded-box animate__animated animate__bounceIn"
            v-else
          >
            <button
              class="btn btn-ghost btn-xl loading hidden lg:flex"
            ></button>
            Waiting for more players...
          </button>
        </div>
        <button
          class="btn btn-lg rounded-box mt-5"
          v-else
          @click="copyToClipboard"
        >
          📋 - Invite
        </button>
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
      settings: {
        maxPlayers: 10,
      },
    }
  },
  computed: {
    location() {
      return window.location.href + '?g=' + this.room.id
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.location)
    },
    changeSettings() {
      this.room.send('settings', this.settings)
    },
    startGame() {
      this.room.send('start')
    },
    kickPlayer(playerId) {
      if (this.room.sessionId === this.state.leader) {
        this.room.send('kickPlayer', playerId)
      }
    },
  },
}
</script>
