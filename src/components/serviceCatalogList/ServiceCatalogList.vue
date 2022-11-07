<template>
    <div class="catalog-list">
        <div class="service-list__count">
            {{ services.length }} Services
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ServiceCatalogList',
  props: {
      services: {
          type: Array,
          required: true,
          default: () => [],
      },
  },
  setup() {
    return {

    }
  },
})
</script>

<style lang="scss" scoped>
.catalog-list {
   display: grid;
   margin: 20px 0 0 0;
   grid-template-columns: 1fr 1fr 1fr;
   gap: 40px;
}
</style>
