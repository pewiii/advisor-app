<template>
  <Modal header="Templates" size="">
    <template #trigger="{open}">
      <pvButton v-ripple class="p-ripple" @click="open" raised :label="selectedTemplate ? 'Change' : 'Choose'" icon="pi pi-file" iconPos="right" outlined size="small" text/>
    </template>
    <template #content>
      <div class="h-full flex flex-col">
        <div class="w-full">
            <pvInputText v-model="search" placeholder="Search" class="w-full mb-2 h-8"/>
        </div>
        <div class="overflow-y-scroll flex-1">
          <div 
          v-for="(template, idx) in templates" 
          :key="template._id" 
          class="p-2 hover:bg-gray-200 flex justify-between" 
          :class="idx % 2 === 0 ? 'bg-gray-100' : ''" 
          @mouseenter="currentTemplate = template"
          >
            <div>
              {{ template.title }}
            </div>
            <div class="font-semibold text-primary cursor-pointer" v-if="currentTemplate === template && selectedTemplate._id !== template._id" @click="selectedTemplate = template">
              Use
            </div>
            <div class="font-semibold text-primary" v-if="selectedTemplate._id === template._id" >
              Selected
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from '@/components/common/Modal.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const selectedTemplate = computed({
  get() {
    return props.modelValue || { _id: null }
  },
  set(template) {
    emit('update:modelValue', template)
  }
})

const search = ref('')
const currentTemplate = ref(null)

// const templatePaginator = ref(null as any)
const templates = ref([] as any[])
const loading = ref(false)
const page = ref(0)
const perPage = ref(50)
const totalRecords = ref(0)
const sortField = ref('updatedAt')
const sortOrder = ref(-1)

const getTemplates = async () => {
  loading.value = true
  try {
    const res = await auth.api.get(
      `/admin/templates?search=${search.value}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)

    templates.value = res.data.paginatedResults
    // totalRecords.value = res.data.total
  } catch(err: any) {
    console.log(err.message)
  }
  loading.value = false
}

onMounted(getTemplates)

watch(search, getTemplates)




</script>