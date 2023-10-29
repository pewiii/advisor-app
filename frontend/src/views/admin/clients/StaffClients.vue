<template>
  <div class="flex gap-8 mt-10 flex-wrap justify-center" v-if="route.path === '/staff/clients'">
    <RouterLink v-for="(menuItem, idx) in menuItems" :to="menuItem.to" :key="`staff-clients-menu-item-${idx}`">
      <div class="btn menu-item">
        <div class="material-icons md-36">
          {{ menuItem.icon }}
        </div>
        <div>
          {{  menuItem.text }}
        </div>
      </div>
    </RouterLink>
  </div>
  <RouterView />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute()

const menuItems = [
  {
    icon: 'list',
    text: 'List',
    to: '/staff/clients/list'
  },
  {
    icon: 'add',
    text: 'Add',
    to: '/staff/clients/add-edit'
  },
]

// for (let i = 0; i < 10; i++) {
//   menuItems.push(
//     {
//       icon: 'star_outline',
//       text: 'future',
//       to: '/staff/clients'
//     }
//   )
// }

</script>

<style scoped>

</style>
