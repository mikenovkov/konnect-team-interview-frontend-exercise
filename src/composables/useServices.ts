import { ref, Ref, onBeforeMount } from 'vue'
import axios from 'axios'

type GetServiceFunction = (serviceId: string) => string | undefined;

interface useServices {
  getServices: () => Promise<void>;
  services: Ref<any[]>;
  loading: Ref<boolean>;
  getService: GetServiceFunction;
}

export default function useServices(): useServices {
  const services = ref([])
  const loading = ref(false)

  const getServices = async () => {
    // Initialize loading state
    loading.value = true
    try {
      // Fetch data from the API
      const result = await axios.get('/api/services')
      services.value = result.data
    } catch (e) {
      console.error('Failed to load services.', e)
    } finally {
      // Reset loading state
      loading.value = false
    }
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices()
  })

  const getService: GetServiceFunction = (serviceId: string) => services.value.find((service: any) => serviceId === service.id)

  // Return stateful data
  return {
    getServices,
    getService,
    services,
    loading,
  }
}
