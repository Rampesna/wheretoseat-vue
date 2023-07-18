<script setup>
import useQuestionStore from '@/store/questionStore';
import { toast } from 'vue3-toastify';

const questionStore = useQuestionStore();

function handleFileUpload(event) {
    questionStore.editQuestionData.updateImage = event.files[0];
}

function handleCorrectAnswerChange(index) {
    questionStore.editQuestionData.answers = questionStore.editQuestionData.answers.map((answer) => {
        if (answer.id === index) {
            answer.is_correct = true;
        } else {
            answer.is_correct = false;
        }
        return answer;
    });
}

function addAnswer() {
    questionStore.editQuestionData.answers.push({
        title: '',
        is_correct: false
    });
}

function removeAnswer(ansewerId) {
    if (questionStore.editQuestionData.answers.length === 2) {
        toast.error('En az bir cevap olmalıdır.');
        return;
    }
    questionStore.editQuestionData.answers = questionStore.editQuestionData.answers.filter((answer) => answer.id !== ansewerId);
}

function handleSubmit() {
    const formData = {
        id: questionStore.editQuestionData.id,
        title: questionStore.editQuestionData.title,
        point: questionStore.editQuestionData.point > 0 ? questionStore.editQuestionData.point : 1,
        topicId: questionStore.topicId,
        image: questionStore.editQuestionData.updateImage,
        answers: questionStore.editQuestionData.answers.map((answer) => ({
            id: answer.id ? answer.id : '',
            title: answer.title,
            isCorrect: answer.is_correct ? 1 : 0
        }))
    };
    questionStore.updateQuestion(formData);
}
</script>

<template>
    <Dialog v-model:visible="questionStore.editDialog" modal header="Soru Düzenle" :style="{ width: '50vw' }">
        <form @submit.prevent="handleSubmit">
            <div class="col-12 md:col-12">
                <div class="p-fluid">
                    <div class="col">
                        <div class="p-field">
                            <label for="title">Soru Başlığı</label>
                            <InputText id="title" required v-model="questionStore.editQuestionData.title" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-field">
                            <label for="point">Soru Puanı</label>
                            <InputText id="point" required type="number" v-model="questionStore.editQuestionData.point" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-field">
                            <label for="icon">Resim</label>
                            <div class="flex">
                                <FileUpload mode="basic" @select="handleFileUpload" choose-label="Resim Seç" />
                                <Button v-if="questionStore.editQuestionData.image" icon="pi pi-trash" class="p-button-danger ml-1" @click="questionStore.removeImage(questionStore.editQuestionData.id)" />
                            </div>
                            <img v-if="questionStore.editQuestionData.image" :src="questionStore.editQuestionData.image" class="img-fluid mt-2" style="width: 50%" />
                        </div>
                    </div>
                    <div v-for="answer in questionStore.editQuestionData.answers" :key="answer.id" class="col">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                <InputSwitch v-model="answer.is_correct" @change="handleCorrectAnswerChange(answer.id)" />
                            </span>
                            <InputText v-model="answer.title" placeholder="Cevap" required />
                            <Button icon="pi pi-trash" class="p-button-danger" @click="removeAnswer(answer.id)" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-content-end mt-2">
                    <Button type="submit" label="Kaydet" class="mr-2" />
                    <Button type="button" label="Yeni Cevap Ekle" @click="addAnswer" />
                </div>
            </div>
        </form>
    </Dialog>
</template>

<style scoped lang="scss"></style>
