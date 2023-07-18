<script setup>
import useUsersStore from '@/store/usersStore';

const usersStore = useUsersStore();
</script>

<template>
    <Dialog v-model:visible="usersStore.createDialog" modal header="Kullanıcı Ekle" :style="{ width: '50vw' }">
        <form @submit.prevent="usersStore.createUser()">
            <div class="p-fluid">
                <div class="p-field m-2">
                    <label for="name">İsim Soyisim</label>
                    <InputText id="name" v-model="usersStore.createUserData.name" required />
                </div>
                <div class="p-field m-2">
                    <label for="email">E-Posta</label>
                    <InputText id="email" v-model="usersStore.createUserData.email" required />
                </div>
                <div class="p-field m-2">
                    <label for="password">Şifre</label>
                    <Password id="password" v-model="usersStore.createUserData.password" required toggle-mask :feedback="false" />
                </div>
                <div class="p-field m-2">
                    <label for="role">Kullanıcı Rolü</label>
                    <Dropdown id="role" v-model="usersStore.createUserData.role" :options="usersStore.roles" optionLabel="name" optionValue="value" required />
                </div>
            </div>
            <div class="flex justify-content-end mt-2">
                <Button type="submit" label="Kaydet" />
            </div>
        </form>
    </Dialog>
</template>

<style scoped lang="scss"></style>
