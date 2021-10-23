<template></template>

<script>
import * as Colyseus from 'colyseus.js'
export default {
  mounted() {
    if (this.$route.query.g) {
      this.$store.commit('updateCode', this.$route.query.g)
    }
    this.$router.push('/login')
  },
  methods: {
    createRoom() {
      client
        .create('petitelaine', { username: this.username })
        .then((room) => {
          console.log(room.sessionId, 'joined', room.name)
          console.log(room)
          this.room = room
          this.room.onStateChange.once((state) => {
            console.log('this is the first room state!', state)
          })

          room.onStateChange((state) => {
            console.log('the room state has been updated:', state)
            state.players.forEach((p, i) => {
              console.log(i)
            })
          })
        })
        .catch((e) => {
          console.log('JOIN ERROR', e)
        })
    },
    joinRoom() {},
    leaveRoom() {},
  },
}
</script>
