<template>
  <HomeNav />
  <!-- <NavBar /> -->
  <!-- <div class="image-parent overflow-hidden relative min-w-screen bg-red-300">
    <img :src="image" class="w-full h-full object-cover bottom-0 left-0 absolute" />
  </div> -->
  <!-- <RouterView /> -->
</template>

<script lang="ts" setup>
// import NavBar from '@/components/common/NavBar.vue'
import HomeNav from '@/components/home/HomeNav.vue'
import image from '@/assets/AIimage.jpeg'
</script>

<style scoped>
  .image-parent {
    height: 70vh;

  }

</style>