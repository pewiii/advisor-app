import { ref, watch, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useSearch = defineStore('search', () => {

  // const debounce = (func: Function, delay: number = 500) => {
  //   let timeoutId: any;
  //   return function (...args: any[]) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       func(...args)
  //     }, delay);
  //   };
  // }

  const searchText = ref('')

  const reset  = () => {
    searchText.value = ''
  }

  return {
    searchText,
    reset
  }
})