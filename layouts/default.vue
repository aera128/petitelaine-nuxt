<template>
  <div ref="pageContent">
    <select
      class="
        select select-bordered
        rounded-full
        font-black
        text-2xl
        absolute
        bottom-5
        left-5
        z-50
      "
      v-model="localeCode"
      @change.prevent="changeLanguage"
    >
      <option
        :value="locale.code"
        v-for="locale in availableLocales"
        :key="locale.code"
        class="font-black text-2xl"
      >
        {{ locale.flag }}
      </option>
    </select>
    <button
      class="btn btn-circle absolute bottom-20 left-5 btn-secondary z-50 text-2xl"
      @click="$store.commit('updateMuted', !$store.getters.isMuted)"
    >
      {{ $store.getters.isMuted ? '🔇' : '🔊' }}
    </button>
    <Nuxt />
  </div>
</template>

<script>
import * as Konami from 'konami'
export default {
  mounted() {
    let vm = this
    new Konami(async () => {
      let ko = document.createElement('div')
      ko.setAttribute(
        'class',
        'w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-transparent animate__animated animate__jackInTheBox animate__faster transform-gpu scale-120'
      )
      let img = document.createElement('img')
      img.setAttribute('src', require('@/static/ko.png'))
      img.setAttribute('class', 'max-h-screen max-w-screen')
      ko.appendChild(img)

      let audio = new Audio('/fx/ko.mp3')
      audio.addEventListener(
        'canplaythrough',
        () => {
          audio.volume = 0.5
          audio.play()
          setTimeout(() => {
            vm.$refs.pageContent.appendChild(ko)
            setTimeout(() => {
              ko.remove()
            }, 2000)
          }, 750)
        },
        false
      )
      audio.load()
    })
  },
  data() {
    return {
      localeCode: this.$i18n.getLocaleCookie(),
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.setLocale(this.localeCode)
    },
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },
}
</script>

<style lang="scss" scoped></style>
