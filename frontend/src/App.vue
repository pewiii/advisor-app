
<template>
  <RouterView />
  <notifications position="bottom left" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue';

const auth = useAuthStore()

onMounted(() => {
  auth.init()
})
</script>


<style>

</style>
