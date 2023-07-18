<script setup>
import useTopicStore from '@/store/topicStore';

const topicStore = useTopicStore();
</script>

<template>
    <Dialog v-model:visible="topicStore.editTopicDialog" modal header="Konu Düzenle" :style="{ width: '50vw' }">
        <form @submit.prevent="topicStore.updateTopic()">
            <div class="p-fluid">
                <div class="p-field m-2">
                    <label for="title">Başlık</label>
                    <InputText id="title" v-model="topicStore.editTopicForm.title" required />
                </div>
                <div class="p-field m-2">
                    <label for="title">Gösterilecek Soru Sayısı</label>
                    <InputText type="number" id="title" v-model="topicStore.editTopicForm.questionCount" required />
                </div>
                <div class="p-field m-2">
                    <label for="title">Sınav Süresi (Dakika)</label>
                    <InputText type="number" id="title" v-model="topicStore.editTopicForm.duration" required />
                </div>
            </div>
            <div class="flex justify-content-end mt-2">
                <Button type="submit" label="Kaydet" />
            </div>
        </form>
    </Dialog>
</template>

<style scoped lang="scss"></style>
