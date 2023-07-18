<script setup>
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import useUsersStore from '@/store/usersStore';
import CreateDialog from '@/views/pages/users/createDialog.vue';
import EditDialog from '@/views/pages/users/editDialog.vue';

const usersStore = useUsersStore();

const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();

onMounted(async () => {
    await usersStore.getAllUsers();
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <DataTable v-model:filters="filters" :value="usersStore.getUsers" paginator :rows="10" :rowsPerPageOptions="[10, 15, 20, 50, 100]" currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <template #header>
                    <div class="flex justify-content-between">
                        <div class="flex items-center">
                            <span class="p-input-icon-left mr-2">
                                <i class="pi pi-search" />
                                <InputText placeholder="Ara" v-model="filters['global'].value" />
                            </span>
                        </div>
                        <Button type="button" icon="pi pi-plus" label="Kullanıcı Ekle" severity="success" v-tooltip.top="'Kullanıcı Ekle'" @click="usersStore.createDialog = true" />
                    </div>
                </template>
                <template #loading> Yükleniyor...</template>
                <template #empty>
                    <div class="flex justify-content-center">
                        <span>Henüz kullanıcı eklenmemiş.</span>
                    </div>
                </template>

                <Column field="name" header="İsim Soyisim" :sortable="'true'" searchable></Column>
                <Column field="email" header="E-Posta Adresi" :sortable="'true'" searchable></Column>
                <Column field="createdAt" header="Eklenme Tarihi" sortable searchable></Column>
                <Column field="updatedAt" header="Güncellenme Tarihi" sortable searchable></Column>
                <Column header="İşlemler">
                    <template #body="slotProps">
                        <span class="p-buttonset">
                            <Button icon="pi pi-pencil" aria-label="Filter" severity="info" type="button" v-tooltip.top="'Kullanıcı Düzenle'" @click="usersStore.getUserById(slotProps.data.id)" />
                            <Button icon="pi pi-trash" aria-label="Filter" severity="danger" type="button" v-tooltip.top="'Kullanıcı Sil'" @click="usersStore.deleteUser(slotProps.data.id)" />
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
