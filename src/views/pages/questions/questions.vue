<script setup>
import useQuestionStore from '@/store/questionStore';
import { onMounted, ref, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import useCategoriesStore from '@/store/categoriesStore';
import CreateDialog from '@/views/pages/questions/createDialog.vue';
import EditDialog from '@/views/pages/questions/editDialog.vue';

const questionStore = useQuestionStore();
const categoriesStore = useCategoriesStore();

const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();
const categoriesSelect = [];
const topicsSelect = [];
onMounted(async () => {
    await categoriesStore.getAllCategories();
    categoriesStore.categories.map((category) => {
        categoriesSelect.push({ name: category.title, id: category.id });
    });
});

const selectedCategory = ref();
const selectedTopic = ref();

watch(selectedCategory, async (newValue) => {
    questionStore.categoryId = newValue.id;
    await questionStore.getTopicList();
    topicsSelect.length = 0;
    questionStore.topicId = null;
    selectedTopic.value = null;
    questionStore.questions.length = 0;
    questionStore.topicList.map((topic) => {
        topicsSelect.push({ name: topic.title, id: topic.id });
    });
});

watch(selectedTopic, async (newValue) => {
    if (newValue !== null) {
        questionStore.topicId = newValue.id;
        await questionStore.getQuestionByTopic();
    }
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <DataTable
                v-model:filters="filters"
                :value="questionStore.questions"
                paginator
                :rows="10"
                :rowsPerPageOptions="[10, 15, 20, 50, 100]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <template #header>
                    <div class="flex justify-content-between">
                        <div class="flex items-center">
                            <Dropdown v-model="selectedCategory" :options="categoriesSelect" optionLabel="name" placeholder="Kategori Seçiniz" class="w-full md:w-20rem" />
                            <Dropdown v-model="selectedTopic" :options="topicsSelect" optionLabel="name" placeholder="Konu Seçiniz" class="w-full md:w-20rem ml-2" />
                        </div>
                        <div class="flex items-center">
                            <span class="p-input-icon-left mr-2">
                                <i class="pi pi-search" />
                                <InputText placeholder="Ara" v-model="filters['global'].value" />
                            </span>
                            <Button v-if="questionStore.topicId" type="button" icon="pi pi-plus" label="Soru Ekle" severity="success" v-tooltip.top="'Soru Ekle'" @click="questionStore.createDialog = true" />
                        </div>
                    </div>
                </template>
                <template #loading> Yükleniyor...</template>
                <template #empty>
                    <div class="flex justify-content-center">
                        <span>Henüz soru eklenmemiş.</span>
                    </div>
                </template>

                <Column field="title" header="Başlık" style="width: 25%" sortable searchable></Column>
                <Column header="Resim">
                    <template #body="slotProps">
                        <div class="flex align-items-center gap-2">
                            <img v-if="slotProps.data.image" :src="slotProps.data.image" alt="" class="img-fluid" style="width: 50px; height: 50px" />
                            <span v-else class="p-badge p-badge-warning p-mr-2">Resim Yok</span>
                        </div>
                    </template>
                </Column>
                <Column header="Cevap Sayısı" searchable>
                    <template #body="slotProps">
                        <span class="p-badge p-badge-info p-mr-2">{{ slotProps.data.answers.length }}</span>
                    </template>
                </Column>
                <Column header="Soru Puanı" searchable>
                    <template #body="slotProps">
                        <span class="p-badge p-badge-success p-mr-2">{{ slotProps.data.point }}</span>
                    </template>
                </Column>
                <Column field="created_at" header="Eklenme Tarihi" sortable searchable></Column>
                <Column field="updated_at" header="Güncellenme Tarihi" sortable searchable></Column>
                <Column header="İşlemler">
                    <template #body="slotProps">
                        <span class="p-buttonset">
                            <Button icon="pi pi-pencil" aria-label="Filter" severity="info" @click="questionStore.editQuestion(slotProps.data.id)" type="button" v-tooltip.top="'Soru Düzenle'" />
                            <Button icon="pi pi-trash" aria-label="Filter" severity="danger" @click="questionStore.deleteQuestion(slotProps.data.id)" type="button" v-tooltip.top="'Soru Sil'" />
                        </span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <CreateDialog />
    <EditDialog />
</template>

<style scoped lang="scss"></style>
