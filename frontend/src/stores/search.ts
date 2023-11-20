import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {

  const searchText = ref('')

  const reset  = () => {
    searchText.value = ''
  }

  return {
    searchText,
    reset
  }
})