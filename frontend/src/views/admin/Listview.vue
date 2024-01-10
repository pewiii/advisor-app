<template>
  <div class="p-6 bg-white">
    <CampaignList v-if="route.name === 'admin-campaigns'" :search="search.searchText" />
    <ClientList v-if="route.name === 'admin-clients'" :search="search.searchText" />
    <TemplateList v-if="route.name === 'admin-templates'" :search="search.searchText" />
    <UserList v-if="route.name === 'admin-users'" :search="search.searchText" />
  </div>
</template>

<script lang="ts" setup>
import CampaignList from '@/components/admin/CampaignList.vue'
import ClientList from '@/components/admin/ClientList.vue'
import TemplateList from '@/components/admin/TemplateList.vue'
import UserList from '@/components/admin/UserList.vue'
import { useSearch } from '@/stores/search';
import { useRoute } from 'vue-router'

const route = useRoute()

const search = useSearch()
</script>