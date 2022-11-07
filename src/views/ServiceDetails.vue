<template>
  <div
    v-if="service"
    class="service-details"
  >
    <BackButton :button-text="'Back To Services List'" />

    <template v-if="service.versions.length">
      <h2 class="service-details__title">
        Versions ({{ service.versions.length }})
      </h2>

      <div class="service-details__list">
        <div
          v-for="versionItem in service.versions"
          :key="versionItem.id"
          class="service-details__item"
        >
          <h4>{{ versionItem.name }}</h4>
          <p class="service-details__item-description">
            {{ versionItem.description }}
          </p>

          <div class="service-type">
            <span
              class="service-type__item"
              :class="{'active-type': service.type === 'HTTP'}"
            >HTTP</span>
            <span
              class="service-type__item"
              :class="{'active-type': service.type === 'REST'}"
            >REST</span>
          </div>

          <div
            v-if="versionItem.developer"
            class="developer-info"
          >
            <img
              alt=""
              class="developer-avatar"
              :src="versionItem.developer.avatar"
            >
            <span class="developer-name">{{ versionItem.developer.name }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="no-details">
        Oops... No details available for this service at this moment.
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import router from '@/router'
import useServices from '@/composables/useServices'
import BackButton from '@/components/common/BackButton.vue'

export default defineComponent({
  name: 'ServiceDetails',
  components: {
    BackButton,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const { getService } = useServices()
    const service = computed(() => getService(props.id))

    return {
      service,
      router,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-details {
    padding: 32px;
    background-color: #fff;

    &__list {
        max-width: 830px;
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 26px 0;
        border-bottom: 1px solid #F1F1F5;

        &-description {
            color: #8A8A8A;
            width: 400px;
            text-align: left;
        }

        .service-type {
            &__item {
                margin-right: 4px;
                padding: 1.5px 6px 2.5px;
                color: #1155CB;
                background-color: #F8F8FA;
                border-radius: 4px;
            }

            .active-type {
                background-color: #BDD3F9;
            }
        }

        .developer-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }

        .developer-info {
            display: flex;
            align-items: center;
            min-width: 200px;
        }

        .developer-name {
          font-weight: 600;
          font-size: 13px;
          margin-left: 4px;
        }
    }

    &__title {
      margin: 32px 0;
    }

    .no-details {
      margin-top: 32px;
    }
}

@media only screen and (max-width: 768px) {
    .service-details {
        &__item {
         flex-direction: column;
         align-items: flex-start;
         gap: 30px;

          &-description {
            width: 350px;
          }
       }
    }
}
</style>
