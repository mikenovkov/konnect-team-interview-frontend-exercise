<template>
  <div class="spinner" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Spinner',
})
</script>

<style lang="scss" scoped>
    .spinner {
        position: relative;
        width: 30px;
        height: 30px;
        margin: 10px auto;
        &::after {
            display: block;
            width: 100%;
            height: 100%;
            margin: 1px;
            border: 3px solid;
            border-color: #072863 transparent #072863 transparent;
            border-radius: 50%;
            animation: rings 1.5s ease-in-out infinite;
            content: ' ';
        }
    }

    @keyframes rings {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
