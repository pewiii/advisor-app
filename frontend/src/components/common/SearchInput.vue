<template>
  <input type="text" placeholder="Search" class="h-8 ml-4 bg-gray-200 px-2 md:w-96" v-model="searchText" />
</template>
<script lang="ts" setup>
import { useSearch } from '@/stores/search';
import { storeToRefs } from 'pinia';

const { searchText } = storeToRefs(useSearch())
</script>