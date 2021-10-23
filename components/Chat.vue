<template>
  <div
    class="
      flex-1
      p:2
      sm:p-6
      justify-between
      flex flex-col
      h-screen
      bg-gray-100
      md:max-w-2xl
      sm:max-w-xl
      xs:max-w-lg 
      max-w-md
      w-full
    "
  >
    <div
      class="flex flex-col space-y-4 p-3 overflow-y-auto"
      ref="chatContainer"
    >
      <div v-if="state.chat.messages.length > 0">
        <div
          class="chat-message overflow-x-hidden"
          v-for="(message, key) in state.chat.messages"
          :key="key"
        >
          <div
            class="
              card
              shadow-lg
              compact
              bg-base-100
              mb-5
              animate__animated animate__bounceIn animate__fast
              rounded-box
            "
          >
            <div class="flex-row items-center space-x-4 card-body">
              <div>
                <div class="avatar">
                  <div class="rounded-btn w-16 h-16">
                    <img
                      :src="
                        'https://avatars.dicebear.com/api/bottts/' +
                        message.avatar +
                        '.svg'
                      "
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 class="card-title font-black">{{ message.username }}</h2>
                <p class="text-base-content font-black text-lg">
                  {{ message.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <form
        class="relative grid grid-cols-6 gap-4"
        @submit.prevent="sendMessage"
      >
        <input
          type="text"
          placeholder="Blablabla"
          class="w-full input input-bordered rounded-box input-lg col-span-5"
          v-model="message"
        />
        <button
          type="button"
          class="inline-flex items-center justify-center btn btn-lg rounded-box"
          @click="sendMessage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5 transform rotate-90"
          >
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { error } from 'daisyui/colors/colorNames'
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
      message: '',
    }
  },
  methods: {
    sendMessage() {
      if (this.message !== '') {
        this.room.send('sendMessage', this.message)
        this.message = ''
      }
    },
  },
  watch: {
    state() {
      try {
        let isBottom =
          this.$refs.chatContainer.scrollHeight -
          this.$refs.chatContainer.scrollTop
        this.$nextTick(() => {
          if (isBottom < 1024) {
            this.$refs.chatContainer.scrollTo(
              0,
              this.$refs.chatContainer.scrollHeight
            )
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
