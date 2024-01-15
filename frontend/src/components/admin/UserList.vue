<template>
  <pvDataTable :value="users" :loading="loading">
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2 justify-between items-center">
        <div>
          <span class="text-xl font-bold">Users</span>
        </div>
        <div class="flex gap-4">
          <pvButton v-ripple class="p-ripple" icon="pi pi-refresh" rounded raised @click="refresh" />
          <RouterLink :to="{ name: 'admin-users-add'}">
            <pvButton v-ripple class="p-ripple" icon="pi" rounded raised><span class="material-icons">add</span></pvButton>
          </RouterLink>
        </div>
          </div>
    </template>
    <template #loading>
      <VueLoader />
    </template>
    <pvColumn field="fullName" header="Name"></pvColumn>
    <pvColumn field="email" header="Email"></pvColumn>
    <pvColumn field="createdAt" header="Created" class="hidden lg:table-cell">
      <template #body="{ data }">
        {{ data.createdAt && format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm') }}
      </template>
    </pvColumn>
    <pvColumn field="updatedAt" header="Updated" class="hidden lg:table-cell">
      <template #body="{ data }">
        {{ data.updatedAt && format(new Date(data.updatedAt), 'dd/MM/yyyy HH:mm') }}
      </template>
    </pvColumn>
    <pvColumn field="isAdmin" header="User Type" class="hidden sm:table-cell">
      <template #body="{ data }">
        {{ data.isAdmin ? 'Admin' : 'User' }}
        <!-- <div class="inline px-2 py-1 rounded-lg text-white" :class="data.status === 'active' ? 'bg-green-600' : 'bg-secondary'">
          {{ data.status }}
        </div> -->
      </template>
    </pvColumn>
    <!-- <pvColumn field="status" header="Status" class="hidden sm:table-cell">
      <template #body="{ data }">
        <div class="inline px-2 py-1 rounded-lg text-white" :class="data.status === 'active' ? 'bg-green-600' : 'bg-secondary'">
          {{ data.status }}
        </div>
      </template>
    </pvColumn> -->
    <pvColumn field="actions" header="Actions">
      <template #body="{ data }">
        <RouterLink :to="{ name: 'admin-users-edit', params: { userId: data._id }}">
          <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600">edit</div>
        </RouterLink>
        <Modal :header="'Delete User'" v-if="auth.user.isAdmin">
          <template v-slot:trigger="{ open }">
            <div class="cursor-pointer material-icons md-30 hover:text-red-600 text-gray-600" @click="open">delete</div>
          </template>
          <template v-slot:content="{ close }">
            <div>Are you sure you want to delete this user?</div>
            <div class="text-red-600">{{ data.fullName }}</div>
            <div class="flex justify-end mt-4">
              <pvButton label="Delete" severity="danger" @click="deleteUser(data, close)"/>
            </div>
          </template>
        </Modal>
      </template>
    </pvColumn>

    <template #footer>
      <div class="h-10 flex justify-around md:justify-between items-center" >
        <div class="hidden md:block">
          Total Users: {{ totalRecords }}
        </div>
        <div class="">
          <pvPaginator ref="userPaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" />
        </div>
      </div>
    </template>
  </pvDataTable>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { format } from 'date-fns'
import { useAuth } from '@/stores/auth';
import VueLoader from '@/components/common/VueLoader.vue'
import Modal from '@/components/common/Modal.vue'

const auth = useAuth()

const props = defineProps(['search'])

const loading = ref(false)
const users = ref([])
const page = ref(0)
const perPage = ref(5)
const totalRecords = ref(0)
const userPaginator = ref(null as any)
const deleteLoading = ref(false)
const sortField = ref('updatedAt')
const sortOrder = ref(-1)

const getUsers = async () => {
  try {
    loading.value = true
    const res = await auth.api.get(
      `/admin/users?search=${props.search}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)
    users.value = res.data.paginatedResults
    // console.log(users.value)
    totalRecords.value = res.data.totalCount
  } catch(err: any) {
    console.log(err.message)
  }
  loading.value = false
}

watch(() => props.search, getUsers)

const refresh = (e: any) => {
  if (userPaginator.value) {
    if (userPaginator.value.page !== 0) {
      userPaginator.value.changePageToFirst(e)
    } else {
      getUsers()
    }
  }
}

const handlePage = (pagination: any) => {
  perPage.value = pagination.rows
  page.value = pagination.page
  getUsers()
}

const deleteUser = async (user: any, closeModal: any) => {
  deleteLoading.value = true
  try {
    await auth.api.delete(`admin/users/${user._id}`)
    users.value = users.value.filter(c => c !== user)
    totalRecords.value = totalRecords.value - 1
  } catch(err: any) {
    console.log(err.message)
  }
  closeModal()
  deleteLoading.value = false
}

onMounted(getUsers)

</script>

<style scoped>
</style>