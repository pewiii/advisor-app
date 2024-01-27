import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAuth } from './auth';
import componentPassthrough from '@/componentPassthrough';

export const useTheme = defineStore('theme', () => {

  const auth = useAuth()

  const config = computed(() => {
    if (auth.user.value && auth.user.value.config) {
      console.log(auth.user.value.config)
      return auth.user.value.config
    }
    return { theme: 'light', primaryColor: 'cyan' }
  })


  const paginatorPassthrough = computed(() => {
    const color = config.value.primaryColor
    return componentPassthrough.createPaginatorPassthrough(color)
  })


  return {
    config,
    paginatorPassthrough,
  }

})
