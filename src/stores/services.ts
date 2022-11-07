import { defineStore } from 'pinia'
import axios from 'axios'

interface State {
  services: [];
  loading: boolean;
  error: string;
}

/** A store to manage services for the application. */
export const useServicesStore = defineStore('services', {
  state: (): State => ({
    services: [],
    loading: false,
    error: '',
  }),
  getters: {
    servicesCounter: (state): number => state.services.length,
  },
  actions: {
    /**
         * Load services and set them to the store.
         */

    async getServices(): Promise<void> {
      // Initialize loading state
      this.loading = true
      try {
        // Fetch data from the API
        const result = await axios.get('/api/services')
        this.services = result.data
      } catch (error) {
        console.error('Failed to load services.', error)
      } finally {
        // Reset loading state
        this.loading = false
      }
    },
  },
})
