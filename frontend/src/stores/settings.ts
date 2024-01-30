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

  // const setTheme = (theme: string) => {
  //   user.value.config.theme = theme
  // }

  // const setPrimaryColor = (primaryColor: string) => {
  //   user.value.config.primaryColor = primaryColor
  // }

  const config = computed(() => user.value.config)

  const theme = computed({
    get() {
      return config.value.theme
      // const darkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // if (config.value.theme === 'os') {
      //   return darkPreferred ? 'dark' : 'light'
      // }
      // return config.value.theme
    },
    set(theme: string) {
      user.value.config.theme = theme
    }
  })

  const color = computed(() => {
    const primaryColor = config.value.primaryColor
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

  const setColor = (color: string) => {
    user.value.config.primaryColor = color
  }


  // const colors = computed({
  //   get() {
  //     const primaryColor = config.value.primaryColor
  //     return {
  //       primary: primaryColor,
  //       primaryAlpha0: primaryColor + '00',
  //       primaryAlpha1: primaryColor + '1a',
  //       primaryAlpha2: primaryColor + '33',
  //       primaryAlpha3: primaryColor + '4d',
  //       primaryAlpha4: primaryColor + '66',
  //       primaryAlpha5: primaryColor + '80',
  //       primaryAlpha6: primaryColor + '99',
  //       primaryAlpha7: primaryColor + 'b3',
  //       primaryAlpha8: primaryColor + 'cc',
  //       primaryAlpha9: primaryColor + 'e6',
  //       primaryAlpha10: primaryColor + 'ff',
  //     }
  //   },
  //   set(color: string) {
  //     user.value.config.primaryColor = color
  //   }
  // })

  const paginatorPassthrough = computed(() => {
    const color = config.value.primaryColor
    return componentPassthrough.createPaginatorPassthrough(color)
  })

  const isDark = ref(false)

  const setDark = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark);
    isDark.value = dark
  }

  const osHandler = (e: any) => { setDark(e.matches) }

  watch(theme, (newTheme) => {
    const dark = newTheme === 'dark' || (newTheme === 'os' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (newTheme === 'os') {
      mediaQuery.addEventListener('change', osHandler)
    } else {
      mediaQuery.removeEventListener('change', osHandler)
    }
    setDark(dark)
  }, { immediate: true})

  const colorChoices = [
    '#dc2626',
    '#ea580c',
    '#d97706',
    '#ca8a04',
    '#65a30d',
    '#16a34a',
    '#059669',
    '#0d9488',
    '#0891b2',
    '#0284c7',
    '#2563eb',
    '#4f46e5',
    '#7c3aed',
    '#9333ea',
    '#c026d3',
    '#db2777',
    '#e11d48',
  ]


  return {
    theme,
    color,
    paginatorPassthrough,
    isDark,
    colorChoices,
    setColor,
  }

})
