<template>
  <div
    class="service-card"
    @click="$emit('click')"
  >
    <div class="service-card__configured">
      <template v-if="service.configured">
        <template v-if="service.published">
          <img
            alt="Published"
            class="service-card__icon"
            :src="PublishedIcon"
          >
          <p class="service-card__configured text">
            Published to portal
          </p>
        </template>

        <template v-else>
          <img
            alt="Published"
            class="service-card__icon"
            :src="UnpublishedIcon"
          >
          <p class="service-card__configured text">
            Unpublished
          </p>
        </template>

        <div class="version-count">
          {{ service.versions.length }}
          <span v-if="service.versions.length === 1">Version</span>
          <span v-else>Versions</span>
        </div>
      </template>

      <template v-else>
        <img
          alt="In Progress"
          class="service-card__icon"
          :src="InProgress"
        >
        <p class="service-card__configured text">
          In progress
        </p>
      </template>
    </div>

    <h3 class="service-card__name">
      {{ service.name }}
    </h3>
    <p class="service-card__description">
      {{ service.description }}
    </p>

    <div class="service-card__data">
      <ul class="service-card__metrics">
        <template v-if="service.configured">
          <li class="service-card__metrics-item">
            {{ service.metrics.latency }}ms
            <span class="service-card__metrics text">latency</span>
          </li>
          <li class="service-card__metrics-item">
            {{ calculatePercent(service.metrics.uptime) }}
            <span class="service-card__metrics text">uptime</span>
          </li>
          <li class="service-card__metrics-item">
            {{ getFirstTwoNumbers(service.metrics.requests) }}
            <span class="service-card__metrics text requests">requests</span>
            {{ calculatePercent(service.metrics.errors) }}
            <span class="service-card__metrics text">errors</span>
          </li>
        </template>

        <template v-else>
          <li class="service-card__metrics not-configured">
            Not configured with runtime yet
          </li>
        </template>
      </ul>

      <div
        v-if="service.published"
        class="service-card__developers"
      >
        <template
          v-for="versionItem in service.versions"
          :key="versionItem.id"
        >
          <img
            alt="Developers"
            class="service-card__developers-developer"
            :src="versionItem.developer?.avatar"
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PublishedIcon from '/src/assets/serviceCard/published-icon.svg'
import UnpublishedIcon from '/src/assets/serviceCard/unpublished-icon.svg'
import InProgress from '/src/assets/serviceCard/in-progress.svg'

export default defineComponent({
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  emits: ['click'],
  setup() {
    const sliceRequestsResult = (num: number, len: number) => {
      const result = String(num).slice(0, len)
      return parseInt(result) + 'k'
    }

    const getFirstTwoNumbers = (requestsNum: number) => {
      if (requestsNum >= 9999) {
        return sliceRequestsResult(requestsNum, 2)
      } else if (requestsNum >= 1000) {
        return sliceRequestsResult(requestsNum, 1)
      } else {
        return requestsNum
      }
    }

    const calculatePercent = (num: number) => (num * 100).toFixed(2) + '%'

    return {
      getFirstTwoNumbers,
      calculatePercent,
      PublishedIcon,
      UnpublishedIcon,
      InProgress,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-card {
  display: flex;
  flex-direction: column;
  padding: 20px 26px 17px;
  border-radius: 2px;
  background-color: #ffffff;

    &:hover {
        cursor: pointer;
        box-shadow: 3px 3px 15px #072863;
    }

    &__configured {
        display: flex;
        align-items: center;

        .text {
            margin-left: 11px;
            font-size: 12px;
            color: #3C4557;
            opacity: .7;
        }

        .version-count {
            margin-left: auto;
            padding: 9px 16px 8px;
            background-color: #F2F6FE;
            color: #5888DB;
            border-radius: 100px;
            font-size: 13px;
        }
    }

    &__name {
      font-size: 20px;
      margin-top: 22px;
    }

    &__description {
        color: #707888;
        font-size: 13px;
        margin: 12px 0;
    }

    &__metrics {
        &-item {
            font-size: 12px;
            color: #3C4557;
            font-weight: 600;
            margin-bottom: 4px;
            &::marker {
             color: #42D782;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }

        .text {
            color: #707888;
        }

        .requests:after {
          content: "\2022";
          display: inline-block;
          color: #707888;
          margin: 0 8px;
        }

        .not-configured {
          font-size: 12px;
          color: #707888;
        }
    }

    &__data {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    &__developers {
        display: inline-flex;
        margin-right: 15px;

        &-developer {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: -15px;
        }
    }

    a {
        display: block;
    }
}
</style>
