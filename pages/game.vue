<template>
  <section class="min-h-screen bg-base-200 drawer drawer-end">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="container mx-auto transition-container duration-300">
        <div v-if="loading" class="text-center font-black text-2xl hero">
          <div class="hero-content">
            <button class="btn btn-ghost btn-xl loading"></button> Loading...
          </div>
        </div>
        <div v-else>
          <div v-if="state !== null">
            <img
              src="@/static/logo.svg"
              alt="logo"
              class="h-32 my-10 animate__animated animate__backInDown"
            />
            <Lobby v-if="state.state === 'lobby'" :state="state" :room="room" />
            <Game v-if="state.state === 'game'" :state="state" :room="room" />
            <Vote v-if="state.state === 'vote'" :state="state" :room="room" />
            <End
              v-if="state.state === 'end' && state.imposter"
              :state="state"
              :room="room"
            />
          </div>
        </div>
        <div v-if="errors" class="text-center font-black text-2xl hero">
          <div class="hero-content">
            <div class="alert alert-error">{{ errors }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side" v-if="state !== null">
      <label
        for="my-drawer"
        class="drawer-overlay opacity-0"
        @click="readMessage(true)"
      ></label>
      <Chat :state="state" :room="room" />
      <label
        for="my-drawer"
        class="
          btn btn-primary btn-circle btn-lg
          text-2xl
          drawer-button
          fixed
          top-5
          right-5
          z-50
        "
        @click="readMessage(false)"
        >💬
        <span
          class="
            w-5
            h-5
            rounded-full
            bg-red-600
            absolute
            top-0
            right-0
            animate__animated animate__bounceIn
          "
          v-if="!isDrawer && newMessageCount - messageCount > 0"
        ></span>
      </label>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    if (this.$route.query.g) {
      this.$store.commit('updateCode', this.$route.query.g)
    }
    this.$router.push('/game')

    if (!this.$store.getters.isUsernameValid) {
      this.$router.push(this.code ? `/login?g=${this.code}` : '/login')
      return
    }

    if ([null, ''].includes(this.$store.getters.getCode)) {
      this.createRoom()
    } else {
      this.joinRoom()
    }
  },
  data() {
    return {
      loading: true,
      errors: null,
      room: null,
      state: null,
      isDrawer: false,
      messageCount: 0,
      newMessageCount: 0,
    }
  },
  methods: {
    createRoom() {
      this.$store.getters.getClient
        .create('petitelaine', {
          username: this.$store.getters.getUsername,
          avatar: this.$store.getters.getAvatar,
        })
        .then((room) => {
          this.room = room
          this.loading = false
        })
        .catch((e) => {
          this.room = null
          this.loading = false
          this.errors = e.message
        })
    },
    joinRoom() {
      this.$store.getters.getClient
        .joinById(this.$store.getters.getCode, {
          username: this.$store.getters.getUsername,
          avatar: this.$store.getters.getAvatar,
        })
        .then((room) => {
          this.room = room
          this.loading = false
        })
        .catch((e) => {
          this.room = null
          this.loading = false
          this.errors = e.message
        })
    },
    objectToMap(obj) {
      const keys = Object.keys(obj)
      const map = new Map()
      for (let i = 0; i < keys.length; i++) {
        map.set(keys[i], obj[keys[i]])
      }
      return map
    },
    readMessage(isOverlay) {
      if (isOverlay) {
        this.isDrawer = false
      } else {
        this.isDrawer = !this.isDrawer
      }

      this.messageCount = this.newMessageCount
    },
  },
  watch: {
    room(room) {
      if (room) {
        room.onStateChange.once((state) => {
          this.state = state
        })

        room.onStateChange((state) => {
          this.state = state
        })

        room.onMessage('stateChange', (state) => {
          state.players = this.objectToMap(state.players)
          this.state = state
        })

        room.onMessage('kicked', (playerId) => {
          if (playerId === room.sessionId) {
            this.$store.commit('updateCode', null)
            this.$router.push('/')
            this.room = null
          }
        })
      }
    },
    'state.chat.messages'(value) {
      this.newMessageCount = value.length
    },
  },
}
</script>

<style lang="scss" scoped></style>
