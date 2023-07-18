<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import useCategoriesStore from '@/store/categoriesStore';
import { FilterMatchMode } from 'primevue/api';
import useTopicStore from '@/store/topicStore';
import CreateDialog from '@/views/pages/topics/createDialog.vue';
import EditDialog from '@/views/pages/topics/editDialog.vue';

const categoriesStore = useCategoriesStore();
const categoriesSelect = [];
const topicStore = useTopicStore();

onMounted(async () => {
    await categoriesStore.getAllCategories();
    categoriesStore.categories.map((category) => {
        categoriesSelect.push({ name: category.title, id: category.id });
    });
});

const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();
const selectedCategory = ref();
watch(selectedCategory, (value) => {
    topicStore.categoryId = value.id;
    topicStore.getTopicsByCategoryId();
});
onUnmounted(() => {
    topicStore.categoryId = null;
    topicStore.topics = [];
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="p-card-body mt-4">
                <DataTable
                    v-model:filters="filters"
                    :value="topicStore.topics"
                    paginator
                    :rows="5"
                    :rowsPerPageOptions="[5, 10, 20, 50, 100]"
                    tableStyle="min-width: 50rem"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                >
                    <template #header>
                        <div class="flex justify-content-between">
                            <Dropdown v-model="selectedCategory" :options="categoriesSelect" optionLabel="name" placeholder="Kategori Seçiniz" class="w-full md:w-20rem" />
                            <div class="flex items-center">
                                <span class="p-input-icon-left mr-2">
                                    <i class="pi pi-search" />
                                    <InputText placeholder="Ara" v-model="filters['global'].value" />
                                </span>
                                <Button type="button" icon="pi pi-plus" label="Konu Ekle" severity="success" @click="topicStore.createTopicDialog = true" class="mr-auto" v-if="topicStore.categoryId" v-tooltip.top="'Konu Ekle'" />
                            </div>
                        </div>
                    </template>

                    <template #loading> Yükleniyor...</template>
                    <template #empty>
                        <div class="flex justify-content-center">
                            <span>Henüz bir konu eklenmemiş.</span>
                        </div>
                    </template>
                    <Column field="title" header="Başlık" sortable></Column>
                    <Column field="duration" header="Süre" sortable>
                        <template #body="slotProps">
                            <span class="p-badge p-badge-success">{{ slotProps.data.duration }}</span>
                        </template>
                    </Column>
                    <Column field="question_count" header="Gösterilecek Soru Sayısı" sortable>
                        <template #body="slotProps">
                            <span class="p-badge p-badge-info">{{ slotProps.data.question_count }}</span>
                        </template>
                    </Column>
                    <Column field="created_at" header="Eklenme Tarihi" sortable></Column>
                    <Column field="updated_at" header="Güncellenme Tarihi" sortable></Column>
                    <Column header="İşlemler">
                        <template #body="slotProps">
                            <span class="p-buttonset">
                                <Button icon="pi pi-pencil" aria-label="Filter" severity="info" @click="topicStore.editTopic(slotProps.data.id)" type="button" v-tooltip.top="'Konuyu Düzenle'" />
                                <Button icon="pi pi-trash" aria-label="Filter" severity="danger" @click="topicStore.deleteTopic(slotProps.data.id)" type="button" v-tooltip.top="'Konuyu Sil'" />
                            </span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <CreateDialog />
    <EditDialog />
</template>

<style scoped lang="scss"></style>
