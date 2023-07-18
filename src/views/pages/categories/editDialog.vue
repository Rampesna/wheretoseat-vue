<script setup>
import useCategoriesStore from '@/store/categoriesStore';

const categoriesStore = useCategoriesStore();

function handleFileUpload(event) {
    const file = event.files[0];
    categoriesStore.editFormData.icon = file;
}
</script>

<template>
    <Dialog v-model:visible="categoriesStore.editCategoryDialog" modal header="Kategori Düzenle" :style="{ width: '50vw' }">
        <form @submit.prevent="categoriesStore.updateCategory()">
            <div class="p-fluid">
                <div class="p-field">
                    <label for="title">Başlık</label>
                    <InputText id="title" v-model="categoriesStore.editFormData.title" required />
                </div>
                <div class="p-field">
                    <label for="icon">Resim</label>
                    <FileUpload mode="basic" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" maxFileSize="10000000" @select="handleFileUpload" />
                </div>
                <div class="p-field">
                    <img v-if="categoriesStore.editFormData.oldIcon" :src="categoriesStore.editFormData.oldIcon" class="img-fluid mt-2" style="width: 50px; height: 50px" />
                </div>
            </div>
            <div class="flex justify-content-end mt-2">
                <Button type="submit" label="Kaydet" />
            </div>
        </form>
    </Dialog>
</template>

<style scoped lang="scss"></style>
