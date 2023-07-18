import { defineStore } from 'pinia';
import NetworkManager from '@/core/NetworkManager';
import ApiConstants from '@/core/ApiConstants';
import { toast } from 'vue3-toastify';

const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: [],
        createCategoryDialog: false,
        formData: {
            title: '',
            icon: null
        },
        editFormData: {
            title: '',
            icon: null,
            id: null,
            oldIcon: null
        },
        editCategoryDialog: false
    }),

    getters: {
        getCategories() {
            return this.categories;
        }
    },

    actions: {
        setCategories(categories) {
            this.categories = categories;
        },
        async getAllCategories() {
            const response = await NetworkManager.get(ApiConstants.GetAllCategories);
            if (response.status === 200) {
                this.setCategories(response.data.data);
            }
        },
        editCategory(id) {
            const category = this.categories.find((x) => x.id === id);
            this.editFormData.title = category.title;
            this.editFormData.id = category.id;
            this.editFormData.oldIcon = category.icon;
            this.editCategoryDialog = true;
        },

        async createCategory() {
            if (this.formData.title === '') {
                toast.error('Lütfen kategori adını giriniz.');
                this.createCategoryDialog = false;
                return;
            }
            const formData = new FormData();
            formData.append('title', this.formData.title);
            if (this.formData.icon) {
                formData.append('icon', this.formData.icon);
            }
            const response = await NetworkManager.post(ApiConstants.CreateCategory, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                toast.success('Kategori başarılı bir şekilde oluşturuldu.');
                this.createCategoryDialog = false;
                this.getAllCategories();
                this.formData.title = '';
                this.formData.icon = null;
            }
        },
        async deleteCategory(id) {
            const response = await NetworkManager.delete(ApiConstants.DeleteCategory + '?id=' + id);
            if (response.status === 200) {
                toast.success('Kategori başarılı bir şekilde silindi.');
                this.getAllCategories();
            }
        },
        async updateCategory() {
            if (this.editFormData.title === '') {
                toast.error('Lütfen kategori adını giriniz.');
                this.editCategoryDialog = false;
                return;
            }
            const formData = new FormData();
            formData.append('title', this.editFormData.title);
            formData.append('id', this.editFormData.id);
            if (this.editFormData.icon) {
                formData.append('icon', this.editFormData.icon);
            }
            const response = await NetworkManager.post(ApiConstants.UpdateCategory, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success('Kategori başarıyla güncellendi.');
                this.getAllCategories();
                this.editFormData.title = '';
                this.editFormData.icon = null;
                this.editFormData.oldIcon = null;
                this.editFormData.id = null;
                this.editCategoryDialog = false;
            }
        }
    }
});

export default useCategoriesStore;
