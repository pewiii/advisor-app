
<template>
  <RouterView />
  <notifications position="bottom left" />
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { onMounted } from 'vue';

const auth = useAuth()

onMounted(auth.init)
</script>


<style>

</style>
