<script setup>
import useQuestionStore from '@/store/questionStore';
import { onMounted, ref, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import useCategoriesStore from '@/store/categoriesStore';
import useAnalyticsStore from '@/store/analyticsStore';
import ViewAnswer from '@/views/pages/analytics/viewAnswer.vue';

const questionStore = useQuestionStore();
const categoriesStore = useCategoriesStore();
const analyticsStore = useAnalyticsStore();

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
        analyticsStore.topicId = newValue.id;
        await analyticsStore.getAnalytics();
    }
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <DataTable
                v-model:filters="filters"
                :value="analyticsStore.analytics"
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
                        </div>
                    </div>
                </template>
                <template #loading> Yükleniyor...</template>
                <template #empty>
                    <div class="flex justify-content-center">
                        <span>Veri Yok</span>
                    </div>
                </template>

                <Column field="user" header="İsim Soyisim" sortable searchable></Column>

                <Column field="score" header="Skor" searchable sortable>
                    <template #body="slotProps">
                        <span v-if="slotProps.data.score >= 75" class="p-badge p-badge-success p-mr-2">{{ slotProps.data.score }}</span>
                        <span v-else-if="slotProps.data.score >= 50" class="p-badge p-badge-warning p-mr-2">{{ slotProps.data.score }}</span>
                        <span v-else class="p-badge p-badge-danger p-mr-2">{{ slotProps.data.score }}</span>
                    </template>
                </Column>

                <Column field="date" header="Sınav Giriş Tarihi" sortable searchable></Column>
                <Column header="İşlemler">
                    <template #body="slotProps">
                        <span class="p-buttonset">
                            <Button icon="pi pi-eye" aria-label="Filter" severity="warning" type="button" v-tooltip.top="'Cevapları Gör'" @click="analyticsStore.getTopicAnswersByUserAndTopic(slotProps.data.user_id)" />
                        </span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <view-answer />
</template>

<style scoped lang="scss"></style>
