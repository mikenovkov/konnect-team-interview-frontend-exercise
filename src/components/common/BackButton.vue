<template>
  <button
    class="back-btn"
    @click="goBack"
  >
    <img
      alt="Back To Services"
      class="back-btn__icon"
      :src="backArrow"
    >
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'
import backArrow from '/src/assets/icons/common/back-arrow.svg'

export default defineComponent({
  name: 'BackButton',
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    componentName: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const goBack = () => {
      return props.componentName ? router.push({ name: props.componentName }) : router.go(-1)
    }
    return {
      router,
      goBack,
      backArrow,
    }
  },
})
</script>

<style lang="scss" scoped>
  .back-btn {
    color: #072863;
    font-size: 16px;
    &__icon {
      margin-right: 8px;
    }
  }
</style>
