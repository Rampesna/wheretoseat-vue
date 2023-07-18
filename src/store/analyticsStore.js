import { defineStore } from 'pinia';
import NetworkManager from '@/core/NetworkManager';
import ApiConstants from '@/core/ApiConstants';
import { toast } from 'vue3-toastify';

const useAnalyticsStore = defineStore('analytics', {
    state: () => ({
        analytics: [],
        answers: [],
        topicId: null,
        viewAnswers: false
    }),

    actions: {
        async getAnalytics() {
            const response = await NetworkManager.get(ApiConstants.GetTopicScore + '?topicId=' + this.topicId);
            if (response.status === 200) {
                this.analytics = response.data.data;
                toast.success('Raporlar başarıyla getirildi.');
            } else {
                toast.error('Raporlar getirilirken bir hata oluştu.');
            }
        },
        async getTopicAnswersByUserAndTopic(userId) {
            const response = await NetworkManager.get(ApiConstants.GetTopicAnswersByUserAndTopic + '?topicId=' + this.topicId + '&userId=' + userId);
            if (response.status === 200) {
                if (response.data.data.length > 0) {
                    this.answers = null;
                    this.answers = response.data.data;
                    this.answers = this.answers.filter((x) => x.question !== null && x.userAnswer !== null);
                    this.viewAnswers = true;
                    toast.success('Raporlar başarıyla getirildi.');
                } else {
                    toast.error('Bu kullanıcı bu konuya ait cevap vermemiştir.');
                }
            } else {
                toast.error('Raporlar getirilirken bir hata oluştu.');
            }
        }
    }
});

export default useAnalyticsStore;
