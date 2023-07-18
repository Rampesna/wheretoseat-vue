<script setup>
import useQuestionStore from '@/store/questionStore';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const questionStore = useQuestionStore();
const answers = ref([{ text: '', correct: ref(true) }]);

function handleFileUpload(event) {
    questionStore.image = event.files[0];
}

function handleCorrectAnswerChange(index) {
    answers.value.forEach((answer, i) => {
        if (i !== index) {
            answer.correct = false;
        } else {
            answer.correct = true;
        }
    });
}

function addAnswer() {
    answers.value.push({
        text: '',
        correct: ref(false)
    });
}

function removeAnswer(index) {
    if (answers.value.length <= 2) {
        toast.error('En az iki cevap olmalıdır.');
        return;
    }
    answers.value.splice(index, 1);
}

function handleSubmit() {
    const formData = {
        title: document.getElementById('title').value,
        point: document.getElementById('point').value > 0 ? document.getElementById('point').value : 1,
        topicId: questionStore.topicId,
        image: questionStore.image,
        answers: answers.value.map((answer) => ({
            title: answer.text,
            isCorrect: answer.correct ? 1 : 0
        }))
    };

    questionStore.createQuestion(formData);
}
</script>

<template>
    <Dialog v-model:visible="questionStore.createDialog" modal header="Soru Ekle" :style="{ width: '50vw' }">
        <form @submit.prevent="handleSubmit">
            <div class="col-12 md:col-12">
                <div class="p-fluid">
                    <div class="col">
                        <div class="p-field">
                            <label for="title">Soru Başlığı</label>
                            <InputText id="title" required />
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-field">
                            <label for="point">Soru Puanı</label>
                            <InputText id="point" required type="number" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-field">
                            <label for="icon">Resim</label>
                            <FileUpload mode="basic" @select="handleFileUpload" />
                        </div>
                    </div>
                    <div v-for="(answer, index) in answers" :key="index" class="col">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                <InputSwitch v-model="answers[index].correct" @change="handleCorrectAnswerChange(index)" />
                            </span>
                            <InputText v-model="answer.text" placeholder="Cevap" required />
                            <Button icon="pi pi-trash" class="p-button-danger" @click="removeAnswer(index)" />
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
