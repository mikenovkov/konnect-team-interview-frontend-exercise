<template>
  <div
    v-if="open"
    class="overlay"
  >
    <div
      v-if="open"
      class="modal-content"
    >
      <button
        class="close-btn"
        @click="$emit('close')"
      >
        x
      </button>
      <h3 class="modal-content__heading">
        Add Service Package
      </h3>
      <p class="modal-content__text">
        Streamlined SaaS API platform for multi-cloud environments.
        Take the complexity out of API management, and build modern applications better, faster, and more securely.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
})
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }

   .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    z-index: 9999;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;

     &__heading {
       margin-bottom: 26px;
     }
  }

   .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
  }
</style>
