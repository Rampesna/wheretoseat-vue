import { defineStore } from 'pinia';
import NetworkManager from '@/core/NetworkManager';
import ApiConstants from '@/core/ApiConstants';
import { toast } from 'vue3-toastify';

const useTopicStore = defineStore('topic', {
    state: () => ({
        categoryId: null,
        topics: [],
        createTopicDialog: false,
        editTopicDialog: false,
        createTopicForm: {
            title: '',
            duration: 0,
            questionCount: 0
        },
        editTopicForm: {
            id: null,
            title: '',
            duration: 0,
            questionCount: 0
        }
    }),
    actions: {
        async getTopicsByCategoryId() {
            const response = await NetworkManager.get(ApiConstants.GetTopicByCategoryId, { id: this.categoryId });
            if (response.status === 200) {
                this.topics = response.data.data;
            }
        },

        async createTopic() {
            const response = await NetworkManager.post(ApiConstants.CreateTopic, {
                categoryId: this.categoryId,
                title: this.createTopicForm.title,
                duration: this.createTopicForm.duration,
                questionCount: this.createTopicForm.questionCount
            });
            if (response.status === 201) {
                this.createTopicDialog = false;
                this.createTopicForm = {
                    title: '',
                    duration: 0,
                    questionCount: 0
                };
                this.getTopicsByCategoryId();
                toast.success('Konu başarıyla oluşturuldu.');
            }
        },
        async deleteTopic(topicId) {
            const response = await NetworkManager.delete(ApiConstants.DeleteTopic + '?id=' + topicId);
            if (response.status === 200) {
                this.getTopicsByCategoryId();
                toast.success('Konu başarıyla silindi.');
            }
        },

        async editTopic(topicId) {
            const topic = this.topics.find((x) => x.id === topicId);
            this.editTopicForm.id = topic.id;
            this.editTopicForm.title = topic.title;
            this.editTopicForm.duration = topic.duration;
            this.editTopicForm.questionCount = topic.question_count;
            this.editTopicDialog = true;
        },

        async updateTopic() {
            const response = await NetworkManager.post(ApiConstants.UpdateTopic, {
                id: this.editTopicForm.id,
                title: this.editTopicForm.title,
                duration: this.editTopicForm.duration,
                questionCount: this.editTopicForm.questionCount,
                categoryId: this.categoryId
            });
            if (response.status === 200) {
                this.editTopicDialog = false;
                this.editTopicForm = {
                    id: null,
                    title: '',
                    duration: 0,
                    questionCount: 0
                };
                this.getTopicsByCategoryId();
                toast.success('Konu başarıyla güncellendi.');
            }
        }
    }
});

export default useTopicStore;
