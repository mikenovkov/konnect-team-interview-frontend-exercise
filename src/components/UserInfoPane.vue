<template>
  <div class="info-pane">
    <img
      alt="user info pane icon"
      class="info-pane__icon"
      :src="userIcon"
    >
    Katherine Ellis
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userIcon from '/src/assets/icons/userInfoPane/user-icon.svg'

export default defineComponent({
  name: 'UserInfoPane',
  setup() {
    return {
      userIcon,
    }
  },
})
</script>

<style lang="scss" scoped>
    .info-pane {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 188px;
        height: 100%;
        background-color: #072863;
        color: #fff;

        &__icon {
            margin-right: 16px;
        }
    }
</style>
