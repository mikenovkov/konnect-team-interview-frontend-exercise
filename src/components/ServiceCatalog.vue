<template>
  <div class="wrapper">
    <div class="service-catalog">
      <Spinner v-if="loading" />

      <template v-else>
        <div class="service-catalog__header">
          <h1 class="service-catalog__header--heading">
            Service Hub
          </h1>

          <div class="service-catalog__header--actions">
            <div class="search">
              <img
                alt="Add Service Package"
                class="search__icon"
                :src="SearchIcon"
              >
              <input
                v-model.trim="searchQuery"
                class="search__input"
                placeholder="Search"
                @input="searchServices"
              >
            </div>

            <button
              class="add-service-btn"
              @click="openModal"
            >
              <img
                alt="Add Service Package"
                class="add-service-btn__icon"
                :src="WhitePlusIcon"
              >
              Service Package
            </button>
          </div>
        </div>

        <p class="service-catalog__subtitle">
          Organize services, manage and track versioning and API service documentation.
          <a
            href="https://konghq.com/products/cloud-api-platform"
            target="_blank"
          >
            Learn more
          </a>
        </p>

        <Modal
          :open="isModalOpen"
          @close="isModalOpen = !isModalOpen"
        />

        <ServiceCatalogList
          :current-page="currentPage"
          :services="services"
        />

        <div
          v-if="shouldShowPagination"
          class="pagination"
        >
          <button
            class="pagination__btn"
            :class="{disabled: isBackButtonDisabled}"
            :disabled="isBackButtonDisabled"
            @click="prevPage"
          >
            <img
              alt="Previous Page"
              class="service-card__icon"
              :src="isBackButtonDisabled ? PreviousPageArrowDisabled : PreviousPageArrow"
            >
          </button>

          <div class="pagination__counters">
            <span class="pagination__counters--items">{{ pagesString }}</span>
            <span class="pagination__counters--total">{{ pageCountString }}</span>
          </div>

          <button
            class="pagination__btn"
            :class="{disabled: isNextButtonDisabled}"
            :disabled="isNextButtonDisabled"
            @click="nextPage"
          >
            <img
              alt="Next Page"
              class="service-card__icon"
              :src="isNextButtonDisabled ? NextPageArrowDisabled : NextPageArrow"
            >
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import axios from 'axios'
import useServices from '@/composables/useServices'
import Spinner from '@/components/common/Spinner.vue'
import Modal from '@/components/common/Modal.vue'
import ServiceCatalogList from '@/components/serviceCatalogList/ServiceCatalogList.vue'
import WhitePlusIcon from '/src/assets/icons/common/white-plus-icon.svg'
import SearchIcon from '/src/assets/icons/common/search-icon.svg'
import NextPageArrow from '/src/assets/icons/common/next-page-arrow.svg'
import PreviousPageArrow from '/src/assets/icons/common/previous-page-arrow.svg'
import PreviousPageArrowDisabled from '/src/assets/icons/common/previous-page-arrow-disabled.svg'
import NextPageArrowDisabled from '/src/assets/icons/common/next-page-arrow-disabled.svg'

// import { useServicesStore } from '../stores/services.ts';
// import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    Spinner,
    ServiceCatalogList,
    Modal,
  },
  setup() {
    // Import services from the composable
    const { services, loading } = useServices()

    // Import services from pinia store
    // const { getServices } = useServicesStore();
    // const { services, loading } = storeToRefs(useServicesStore());

    // Set the search string to a Vue ref
    const searchQuery = ref('')

    const searchServices = async () => {
      currentPage.value = 1
      if (searchQuery.value != null) {
        const result = await axios.get(`/api/services/?q=${searchQuery.value}`.toLowerCase())
        services.value = result.data as []

        // search query can be added this way to URL if needed
        // await router.replace({
        //     ...router.currentRoute,
        //     query: {
        //         services: searchQuery.value || undefined,
        //     }
        // });
      }
    }

    // onBeforeMount(async (): Promise<void> => {
    //   // Fetch services from the API via pinia store
    //   await getServices();
    // });

    const currentPage = ref(1)
    const pageSize = ref(9)

    const totalPages = computed((): number => Math.ceil(services.value.length / pageSize.value))

    const isNextButtonDisabled = computed(() => currentPage.value === totalPages.value)
    const isBackButtonDisabled = computed(() => currentPage.value === 1)

    const shouldShowPagination = computed((): boolean => totalPages.value > 1)

    const startCount = computed((): number => (currentPage.value - 1) * pageSize.value + 1)
    const countEnd = computed((): number => {
      const calculatedEndCount = startCount.value - 1 + pageSize.value
      return calculatedEndCount > services.value.length
        ? services.value.length
        : calculatedEndCount
    })

    const pagesString = computed((): string => `${startCount.value} to ${countEnd.value}`)
    const pageCountString = computed((): string => ` of ${services.value.length} services`)

    const nextPage = ():void => {
      currentPage.value++
    }

    const prevPage = ():void => {
      currentPage.value--
    }

    const isModalOpen = ref(false)

    const openModal = () => {
      isModalOpen.value = true
    }

    return {
      services,
      loading,
      searchQuery,
      searchServices,

      // icons
      WhitePlusIcon,
      SearchIcon,
      PreviousPageArrow,
      NextPageArrow,
      PreviousPageArrowDisabled,
      NextPageArrowDisabled,

      // modal
      isModalOpen,
      openModal,

      // pagination
      isNextButtonDisabled,
      isBackButtonDisabled,
      nextPage,
      prevPage,
      currentPage,
      totalPages,
      shouldShowPagination,
      pagesString,
      pageCountString,
    }
  },
})
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: #F8F8FA;
  }

.service-catalog {
  max-width: 1440px;
  margin: 0 auto;
  padding: 53px 20px 20px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    &--heading {
      font-size: 32px;
      font-weight: 700;
    }

    &--actions {
      display: flex;
      align-items: center;

      .search {
        position: relative;
        width: 209px;
        margin-right: 24px;

        &__input {
          width: 209px;
          padding: 10px 16px 10px 36px;
          border: 1px solid #E7E7EC;
          border-radius: 4px;
        }

        &__icon {
          position: absolute;
          width: 16px;
          height: 16px;
          top: 50%;
          transform: translateY(-50%);
          left: 10px;
          z-index: 999;
        }
      }
    }
  }

  &__subtitle {
    a {
      color: #1456CB;
    }
  }
}

.add-service-btn {
  padding: 12px 24px 12px 16px;
  width: 197px;
  height: 44px;
  background-color: #07A88D;
  color: #fff;
  border-radius: 100px;
  border: none;
  font-size: 16px;

  &__icon {
    margin-right: 6px;
  }
}

.pagination {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 262px;
  margin: 24px auto;

  &__btn {
    width: 44px;
    height: 44px;

    :hover {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      box-shadow: 2px 2px 2px #1456cb;
    }
  }

  &__counters {
    font-size: 13px;
    color: #3C4557;

    &--items{
      font-weight: 600;
    }
  }
}

@media only screen and (max-width: 768px) {
  .service-catalog {
    &__header {
      display: block;

      &--heading {
        margin-bottom: 30px;
      }

      &--actions {
        width: 100%;
        flex-direction: column;

        .search {
          width: 100%;
          margin-right: 0;

          &__input {
            width: 100%;
          }
        }
      }
    }

    .add-service-btn {
      width: 100%;
      margin: 30px 0;
    }
  }
}
</style>
