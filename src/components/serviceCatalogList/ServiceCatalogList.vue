<template>
  <div class="service-list__count">
    {{ services.length }} Results
  </div>
  <div class="catalog-list">
    <template
      v-for="service in paginatedData"
      :key="service.id"
    >
      <ServiceCard
        :service="service"
        @click="goToDetails(service)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import router from '@/router'
import ServiceCard from '@/components/serviceCatalogList/ServiceCard.vue'

export default defineComponent({
  name: 'ServiceCatalogList',
  components: {
    ServiceCard,
  },
  props: {
    services: {
      type: Array,
      required: true,
      default: () => [],
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const goToDetails = async (serviceId): Promise<void> => {
      await router.push({
        name: 'ServiceDetails',
        params: {
          id: serviceId.id,
        },
      })
    }

    const services = computed(() => props.services)
    const currPage = computed(() => props.currentPage)
    const pageSize = ref(9)

    const paginatedData = computed(() =>
      services.value.slice((currPage.value - 1) * pageSize.value, currPage.value * pageSize.value),
    )

    return {
      goToDetails,
      paginatedData,
      pageSize,
    }
  },
})
</script>

<style lang="scss" scoped>
.catalog-list {
   display: grid;
   margin: 20px 0 0 0;
   grid-template-columns: repeat(3, 1fr);
   gap: 40px;
}

.service-list {
    &__count {
        margin-top: 53px;
    }
}

@media only screen and (max-width: 600px) {
    .catalog-list {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media only screen and (min-width: 601px) and (max-width: 959px) {
    .catalog-list {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
