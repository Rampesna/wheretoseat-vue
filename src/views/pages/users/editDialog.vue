<script setup>
import useUsersStore from '@/store/usersStore';

const usersStore = useUsersStore();
</script>

<template>
    <Dialog v-model:visible="usersStore.editDialog" modal header="Kullanıcı Düzenle" :style="{ width: '50vw' }">
        <form @submit.prevent="usersStore.updateUser()">
            <div class="p-fluid">
                <div class="p-field m-2">
                    <label for="name">İsim Soyisim</label>
                    <InputText id="name" v-model="usersStore.editUserData.name" required />
                </div>
                <div class="p-field m-2">
                    <label for="email">E-Posta</label>
                    <InputText id="email" v-model="usersStore.editUserData.email" required />
                </div>
                <div class="p-field m-2">
                    <label for="password">Şifre</label>
                    <Password id="password" v-model="usersStore.editUserData.password" toggle-mask :feedback="false" placeholder="Şifre değiştirmek istemiyorsanız boş bırakın." />
                </div>
                <div class="p-field m-2">
                    <label for="role">Kullanıcı Rolü</label>
                    <Dropdown id="role" v-model="usersStore.editUserData.role" :options="usersStore.roles" optionLabel="name" optionValue="value" required />
                </div>
            </div>
            <div class="flex justify-content-end mt-2">
                <Button type="submit" label="Kaydet" />
            </div>
        </form>
    </Dialog>
</template>

<style scoped lang="scss"></style>
