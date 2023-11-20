<template>
  <div class="p-6 bg-white">
    <TemplateList :search="search.searchText" />
  </div>
</template>

<script lang="ts" setup>
import TemplateList from '@/components/admin/TemplateList.vue'
import { useSearchStore } from '@/stores/search';

const search = useSearchStore()
</script>