import { defineStore } from 'pinia';
import NetworkManager from '@/core/NetworkManager';
import ApiConstants from '@/core/ApiConstants';
import { toast } from 'vue3-toastify';

const useQuestionStore = defineStore('question', {
    state: () => ({
        topicId: null,
        categoryId: null,
        image: null,
        updateImage: null,
        questions: [],
        topicList: [],
        createDialog: false,
        editDialog: false,
        editQuestionData: null
    }),
    actions: {
        async getQuestionByTopic() {
            if (this.topicId !== null) {
                const response = await NetworkManager.get(ApiConstants.GetQuestionByTopic + '?id=' + this.topicId);
                if (response.status === 200) {
                    this.questions = response.data.data;
                    toast.success('Sorular başarıyla getirildi.');
                }
            }
        },
        async getTopicList() {
            const response = await NetworkManager.get(ApiConstants.GetTopicByCategoryId + '?id=' + this.categoryId);
            if (response.status === 200) {
                this.topicList = response.data.data;
            }
        },
        async createQuestion(formData) {
            const response = await NetworkManager.post(ApiConstants.CreateQuestion, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success('Soru başarıyla eklendi.');
                this.getQuestionByTopic();
                this.createDialog = false;
            } else {
                toast.error('Soru eklenirken bir hata oluştu.');
            }
        },
        async deleteQuestion(id) {
            const response = await NetworkManager.delete(ApiConstants.DeleteQuestion + '?id=' + id);
            if (response.status === 200) {
                toast.success('Soru başarıyla silindi.');
                this.getQuestionByTopic();
            } else {
                toast.error('Soru silinirken bir hata oluştu.');
            }
        },
        async editQuestion(questionId) {
            const response = await NetworkManager.get(ApiConstants.GetQuestionById + '?id=' + questionId);
            if (response.status === 200) {
                const answers = response.data.data.answers;
                answers.map((answer) => {
                    if (answer.is_correct === 1) {
                        answer.is_correct = true;
                    } else {
                        answer.is_correct = false;
                    }
                }, answers);
                this.editQuestionData = response.data.data;
                this.editDialog = true;
            }
        },
        async updateQuestion(formData) {
            const response = await NetworkManager.post(ApiConstants.UpdateQuestion, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success('Soru başarıyla güncellendi.');
                this.getQuestionByTopic();
                this.editDialog = false;
            } else {
                toast.error('Soru güncellenirken bir hata oluştu.');
            }
        },
        async removeImage(id) {
            const response = await NetworkManager.post(ApiConstants.RemoveImage, { id: id });
            if (response.status === 200) {
                toast.success('Resim başarıyla silindi.');
                this.editQuestionData.image = null;
                this.getQuestionByTopic();
            } else {
                toast.error('Resim silinirken bir hata oluştu.');
            }
        }
    }
});

export default useQuestionStore;
