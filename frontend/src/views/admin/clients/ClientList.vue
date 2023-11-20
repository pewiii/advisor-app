<template>
   <div class="p-6 bg-white">
     <ClientList :search="search.searchText" />
   </div>
</template>

<script lang="ts" setup>
import ClientList from '@/components/admin/ClientList.vue'
import { useSearchStore } from '@/stores/search';

const search = useSearchStore()

</script>