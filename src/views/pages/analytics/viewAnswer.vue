<script setup>
import useAnalyticsStore from '@/store/analyticsStore';
import { ref } from 'vue';

const analyticsStore = useAnalyticsStore();
const expandedRows = ref([]);
</script>

<template>
    <Dialog v-model:visible="analyticsStore.viewAnswers" modal header="Kullanıcı Verileri" :style="{ width: '50vw' }">
        <DataTable :value="analyticsStore.answers" tableStyle="min-width: 50rem" v-model:expandedRows="expandedRows" data-key="question.title">
            <Column :expander="true" headerStyle="min-width: 3rem" />
            <Column field="question.title" header="Soru Başlığı"></Column>
            <Column field="userAnswer.title" header="Verilen Cevap"></Column>
            <Column field="userAnswer.title" header="Durum">
                <template #body="slotProps">
                    <span v-if="slotProps.data.userAnswer.is_correct === 1" class="p-tag p-tag-success">Doğru</span>
                    <span v-else class="p-tag p-tag-danger">Yanlış</span>
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="p-3">
                    <h5 class="text-lg font-semibold">Soru Cevapları</h5>
                    <DataTable :value="slotProps.data.question.answers" responsiveLayout="scroll">
                        <Column field="title" header="Başlık" :sortable="true" />

                        <Column field="is_correct" header="Durum" :sortable="true">
                            <template #body="slotProps">
                                <span v-if="slotProps.data.is_correct === 1" class="p-tag p-tag-success">Doğru</span>
                                <span v-else class="p-tag p-tag-danger">Yanlış</span>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </Dialog>
</template>

<style scoped lang="scss"></style>
