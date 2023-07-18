<script setup>
import useCategoriesStore from '@/store/categoriesStore';

const categoriesStore = useCategoriesStore();

function handleFileUpload(event) {
    const file = event.files[0];
    categoriesStore.formData.icon = file;
}
</script>

<template>
    <Dialog v-model:visible="categoriesStore.createCategoryDialog" modal header="Kategori Ekle" :style="{ width: '50vw' }">
        <form @submit.prevent="categoriesStore.createCategory()">
            <div class="p-fluid">
                <div class="p-field">
                    <label for="title">Başlık</label>
                    <InputText id="title" v-model="categoriesStore.formData.title" required />
                </div>
                <div class="p-field">
                    <label for="icon">Resim</label>
                    <FileUpload mode="basic" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" maxFileSize="10000000" @select="handleFileUpload" />
                    <image :src="categoriesStore.tempImage" />
                </div>
            </div>
            <div class="flex justify-content-end mt-2">
                <Button type="submit" label="Kaydet" />
            </div>
        </form>
    </Dialog>
</template>

<style scoped lang="scss"></style>
