import { defineStore } from 'pinia';
import NetworkManager from '@/core/NetworkManager';
import ApiConstants from '@/core/ApiConstants';
import { toast } from 'vue3-toastify';
import moment from 'moment';

const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        createDialog: false,
        editDialog: false,
        createUserData: {
            name: '',
            email: '',
            password: '',
            role: ''
        },
        editUserData: null
    }),
    getters: {
        getUsers() {
            return this.users;
        }
    },
    actions: {
        async getAllUsers() {
            const response = await NetworkManager.get(ApiConstants.GetAllUsers);
            if (response.status === 200) {
                this.users = response.data.data.map((row) => {
                    return {
                        id: row.id,
                        name: row.name,
                        email: row.email,
                        createdAt: moment(row.createdAt).format('DD.MM.YYYY HH:mm:ss')
                    };
                });
                toast.success('Kullanıcılar başarıyla getirildi.');
            } else {
                toast.error('Kullanıcılar getirilirken bir hata oluştu.');
            }
        },
        async createUser() {
            const response = await NetworkManager.post(ApiConstants.CreateUser, this.createUserData);
            if (response.status === 201) {
                this.createDialog = false;
                this.createUserData = {
                    name: '',
                    email: '',
                    password: ''
                };
                toast.success('Kullanıcı başarıyla oluşturuldu.');
                await this.getAllUsers();
            } else {
                toast.error('Kullanıcı oluşturulurken bir hata oluştu.');
            }
        },
        async deleteUser(id) {
            const response = await NetworkManager.delete(ApiConstants.DeleteUser + '?id=' + id);
            if (response.status === 200) {
                toast.success('Kullanıcı başarıyla silindi.');
                await this.getAllUsers();
            } else {
                toast.error('Kullanıcı silinirken bir hata oluştu.');
            }
        },
        async getUserById(id) {
            const response = await NetworkManager.get(ApiConstants.GetUserById + '?id=' + id);
            if (response.status === 200) {
                this.editUserData = response.data.data;
                this.editDialog = true;
            }
        },
        async updateUser() {
            const response = await NetworkManager.put(ApiConstants.UpdateUser, this.editUserData);
            if (response.status === 200) {
                this.editDialog = false;
                this.editUserData = null;
                toast.success('Kullanıcı başarıyla güncellendi.');
                await this.getAllUsers();
            } else {
                toast.error('Kullanıcı güncellenirken bir hata oluştu.');
            }
        }
    }
});

export default useUsersStore;
