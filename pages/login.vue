<template>
  <section class="hero min-h-screen bg-base-200">
    <div class="text-center hero-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold animate__animated animate__bounceIn">
          {{ $t('chooseUsername') }}
        </h1>
        <div class="avatar mb-4">
          <div
            class="rounded-btn w-48 h-48 animate__animated animate__bounceIn"
          >
            <img
              :src="`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${avatar}`"
            />
          </div>
          <button
            class="btn btn-circle absolute bottom-0 right-0 text-2xl"
            @click="generateAvatar"
          >
            🎲
          </button>
        </div>
        <form @submit.prevent="updateUsernameAndConnect" ref="formLogin">
          <div class="form-control">
            <input
              type="text"
              class="input text-xl animate__animated animate__bounceIn"
              v-model="username"
              @input="submitted = false"
            />
          </div>
          <div
            class="alert alert-error mt-4 animate__animated animate__bounceIn"
            v-if="!this.isUsernameValid && submitted"
          >
            <div>
              {{ $t('correctUsername') }}
            </div>
          </div>
          <button
            class="btn btn-primary mt-4 animate__animated animate__bounceIn"
            type="submit"
          >
            Let's go !
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import faker from 'faker'
export default {
  mounted() {
    if (this.$route.query.g) {
      this.$store.commit('updateCode', this.$route.query.g)
    }
    this.$router.push('/login')
    this.$store.commit('updateAvatar', this.avatar)
  },
  data() {
    return {
      username: localStorage.getItem('username')
        ? localStorage.getItem('username')
        : faker.internet.userName(),
      avatar: localStorage.getItem('avatar')
        ? localStorage.getItem('avatar')
        : faker.datatype.uuid(),
      submitted: false,
    }
  },
  methods: {
    generateAvatar() {
      this.avatar = faker.datatype.uuid()
      this.$store.commit('updateAvatar', this.avatar)
    },
    updateUsernameAndConnect() {
      if (this.isUsernameValid) {
        this.$store.commit('updateUsername', this.username)
        if (this.$store.getters.getUsername.length > 1) {
          if (this.$store.getters.getCode) {
            this.$router.push(`/game?g=${this.$store.getters.getCode}`)
          } else {
            this.$router.push('/game')
          }
        }
      }
      this.submitted = true
    },
  },
  computed: {
    isUsernameValid() {
      let valid = this.username.match(/^[a-zA-Z0-9]+([_ .-]?[a-zA-Z0-9])*$/)
      return valid !== null && this.username.length > 2
    },
  },
}
</script>
