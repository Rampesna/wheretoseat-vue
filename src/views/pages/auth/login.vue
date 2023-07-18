<script setup>
import { ref } from 'vue';
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/store/authStore";
const email = ref('');
const password = ref('');
const checked = ref(false);

function login() {
  if (email.value === '' || password.value === '') {
    toast.error('Email veya şifre boş olamaz');
  } else {
      const authStore = useAuthStore();
      authStore.login(email.value, password.value);
  }
}


</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Yönetim Paneli</div>
                        <span class="text-600 font-medium">Lütfen giriş yapınız</span>
                    </div>
                    <div>
                      <form @submit.prevent="login">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email adresinizi giriniz" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Şifre</label>
                        <Password id="password1" v-model="password" placeholder="Şifrenizi giriniz" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem" :feedback="false" ></Password>
                        <Button label="Giriş Yap" class="w-full p-3 text-xl" type="submit"></Button>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
