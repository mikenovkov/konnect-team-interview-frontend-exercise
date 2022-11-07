<template>
  <header class="konnect-header">
    <div class="logo">
      <router-link
        class="logo__link"
        :to="'/'"
      >
        <img
          alt="Kong logo"
          class="logo__img"
          :src="kongLogo"
        >
      </router-link>
    </div>

    <div class="navigation">
      <MainNavigation />
      <UserInfoPane />
    </div>

    <div class="mobile-navigation burger">
      <button class="burger__btn">
        <span class="burger__lines">
          <span class="burger__line" />
        </span>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainNavigation from '@/components/mainHeader/MainNavigation.vue'
import UserInfoPane from '@/components/UserInfoPane.vue'
import kongLogo from '/src/assets/images/logo.svg'

export default defineComponent({
  name: 'MainHeader',
  components: {
    MainNavigation,
    UserInfoPane,
  },
  setup() {
    return {
      kongLogo,
    }
  },
})
</script>

<style lang="scss">
    .navigation {
        display: flex;
        align-items: center;
    }

    .konnect-header {
        display: flex;
        justify-content: space-between;
        height: 70px;
        background: linear-gradient(180deg, #09224F 0%, #073382 100%);

        .logo {
            display: flex;
            align-items: center;
        }
    }

    .mobile-navigation {
        display: none;

        .burger {
            &__btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 64px;
                background-color: transparent;
                border: none;
            }

            &__lines {
                z-index: 20;
                display: block;
                width: 14px;
                height: 10px;
                padding-top: 5px;
            }

            &__line::before,
            &__line::after,
            &__line {
                width: 100%;
                height: 2px;
                background-color: #ffffff;
                border-radius: 2px;
            }

            &__line {
                position: relative;
                display: block;
            }

            &__line::before,
            &__line::after {
                position: absolute;
                left: 0;
                content: '';
            }

            &__line::before {
                top: -4px;
            }

            &__line::after {
                top: 4px;
            }
        }
    }

    @media only screen and (max-width: 959px) {
        .navigation {
          display: none;
        }

        .mobile-navigation {
            display: block;
            width: 100%;
            max-width: 64px;
        }
    }
</style>
