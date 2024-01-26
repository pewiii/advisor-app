import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification"
import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const API_URL = import.meta.env.VITE_APP_API_URL

  const router = useRouter()

  const api = ref(null as any)

  const user = ref(null as any)
  const error = ref(null)
  

  const reset = () => {
    api.value = axios.create({ baseURL: API_URL })
    user.value = null
    error.value = null

    api.value.interceptors.request.use((config: any) => {
      error.value = null
      return config;
    }, (error: any) => {
      return Promise.reject(error)
    });

    api.value.interceptors.response.use((response: any) => {
      return response;
    }, (error: any) => {
      if (error && error.response) {
        if (error.response.status === 401) {
          logout()
          router.go(0)
        } else if (error.response.data && error.response.data.message) {
          notify({
            title: 'Error',
            text: error.response.data.message,
            type: 'error'
          })
        }
      }
      return Promise.reject(error);
    });
  
  }

  const setAuthHeader = (token: string) => {
    if (api.value) {
      api.value.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  const init = () => {
    reset()
    try {
      const token = localStorage.getItem('token')
      if (token) {
        setAuthHeader(token)
      }
      const storedUser = localStorage.getItem('user')
  
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      }
    } catch(err: any) {
      console.log(err.message)
      reset()
    }
  }

  const login = async (credentials: { email: string; password: string }, userType: 'admin' | 'client') => {
    reset()
    try {
      const loginPath = {
        admin: '/admin/login',
        client: '/login'
      }
      const res = await api.value.post(loginPath[userType], credentials)
      setAuthHeader(res.data.token)
      user.value = res.data.user
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
    } catch(err: any) {
      error.value = err.message
      console.log('Login Error')
    }
  }

  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    reset()
  }

  const isAuthenticated = computed(() => {
    return user.value
  })

  const isAdmin = computed(() => {
    return user.value && user.value.userType === 'admin'
  })

  return { 
    user,
    login,
    logout,
    init,
    api,
    isAuthenticated,
    isAdmin
   }
})
