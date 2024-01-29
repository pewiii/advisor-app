import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useAuth } from './auth';
import componentPassthrough from '@/componentPassthrough';

export const useSettings = defineStore('settings', () => {

  const auth = useAuth()

  const { user } = storeToRefs(auth)

  // const config = computed(() => {
  //   if (user.value && user.value.config) {
  //     return user.value.config
  //   }
  //   const darkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

  //   return { theme: darkPreferred ? 'dark' : 'light', primaryColor: '#0284c7' }
  // })

  const config = computed(() => user.value.config)

  const theme = computed(() => {
    const darkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return config.value ? config.value.theme : darkPreferred ? 'dark' : 'light'
  })

  const colors = computed(() => {


    const primaryColor = config.value && config.value.primaryColor ? config.value.primaryColor : '#0284c7'

    console.log(primaryColor)
    return {
      primary: primaryColor,
      primaryAlpha0: primaryColor + '00',
      primaryAlpha1: primaryColor + '1a',
      primaryAlpha2: primaryColor + '33',
      primaryAlpha3: primaryColor + '4d',
      primaryAlpha4: primaryColor + '66',
      primaryAlpha5: primaryColor + '80',
      primaryAlpha6: primaryColor + '99',
      primaryAlpha7: primaryColor + 'b3',
      primaryAlpha8: primaryColor + 'cc',
      primaryAlpha9: primaryColor + 'e6',
      primaryAlpha10: primaryColor + 'ff',
    }
    })


  const paginatorPassthrough = computed(() => {
    const color = config.value.primaryColor
    return componentPassthrough.createPaginatorPassthrough(color)
  })

  const setTheme = (theme: string) => {
    // user.value.config.theme = theme
    // console.log(user.value.config)
    if (!user.value.config) {
      user.value.config = {}
    }
    user.value.config = {
      ...user.value.config,
      theme
    }
    console.log(user.value)
  }

  const setPrimaryColor = (primaryColor: string) => {
    user.value.config.primaryColor = primaryColor
  }

  watch(theme, (newTheme) => {
    const dark = newTheme === 'dark'
    document.documentElement.classList.toggle('dark', dark);
  }, { immediate: true})


  return {
    theme,
    colors,
    paginatorPassthrough,
    setTheme,
    setPrimaryColor
  }

})
