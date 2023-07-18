<script setup>
import useCategoriesStore from '@/store/categoriesStore';
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import CreateDialog from '@/views/pages/categories/createDialog.vue';
import EditDialog from '@/views/pages/categories/editDialog.vue';

const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();

const categoriesStore = useCategoriesStore();
onMounted(async () => {
    await categoriesStore.getAllCategories();
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <DataTable
                v-model:filters="filters"
                :value="categoriesStore.getCategories"
                paginator
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50, 100]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <template #header>
                    <div class="flex justify-content-between">
                        <Button type="button" icon="pi pi-plus" label="Ekle" severity="success" @click="categoriesStore.createCategoryDialog = true" v-tooltip.top="'Kategori Ekle'" />
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText placeholder="Ara" v-model="filters['global'].value" />
                        </span>
                    </div>
                </template>
                <template #loading> Yükleniyor...</template>
                <template #empty>
                    <div class="flex justify-content-center">
                        <span>Henüz kategori eklenmemiş.</span>
                    </div>
                </template>
                <Column header="Resim" sortable>
                    <template #body="slotProps">
                        <div class="flex align-items-center gap-2">
                            <img v-if="slotProps.data.icon" :src="slotProps.data.icon" alt="" class="img-fluid" style="width: 50px; height: 50px" />
                            <span v-else class="p-badge p-badge-warning p-mr-2">Resim Yok</span>
                        </div>
                    </template>
                </Column>
                <Column field="title" header="Başlık" style="width: 25%" sortable></Column>
                <Column field="created_at" header="Eklenme Tarihi" sortable></Column>
                <Column field="updated_at" header="Güncellenme Tarihi" sortable></Column>
                <Column header="İşlemler">
                    <template #body="slotProps">
                        <span class="p-buttonset">
                            <Button icon="pi pi-pencil" aria-label="Filter" severity="info" @click="categoriesStore.editCategory(slotProps.data.id)" type="button" v-tooltip.top="'Kategori Düzenle'" />
                            <Button icon="pi pi-trash" aria-label="Filter" severity="danger" @click="categoriesStore.deleteCategory(slotProps.data.id)" type="button" v-tooltip.top="'Kategori Sil'" />
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
