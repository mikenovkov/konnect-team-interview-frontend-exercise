<template>
  <div class="main-navigation">
    <nav class="main-navigation__nav">
      <router-link
        class="main-navigation__nav-link"
        to="/"
      >
        <img
          alt="Organization Menu Link"
          class="nav-link__icon"
          :src="organizationIcon"
        >
        Organization
      </router-link>
      <router-link
        class="main-navigation__nav-link"
        to="/"
      >
        <img
          alt="Settings Menu Link"
          class="nav-link__icon"
          :src="settingsIcon"
        >
        Settings
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import organizationIcon from '/src/assets/icons/mainNavigation/organization-icon.svg'
import settingsIcon from '/src/assets/icons/mainNavigation/settings-icon.svg'

export default defineComponent({
  name: 'MainNavigation',
  setup() {
    return {
      organizationIcon,
      settingsIcon,
    }
  },
})
</script>

<style lang="scss">
    .main-navigation {
        display: flex;
        align-items: center;
        &__nav {
            margin-right: 30px;

            &-link {
                display: inline-flex;
                align-items: center;
                color: #fff;
                text-decoration: none;
                margin-left: 26px;

                .nav-link__icon {
                    margin-right: 12px;
                }
            }
        }
    }
</style>
