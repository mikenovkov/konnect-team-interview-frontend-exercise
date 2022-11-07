<template>
  <MainHeader />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainHeader from '@/components/mainHeader/MainHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    MainHeader,
  },
})
</script>
