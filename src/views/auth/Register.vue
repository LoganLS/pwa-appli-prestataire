<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import router from '@/router'
import { createPrestataire } from '@/services/prestataire'

const email = ref<string>('')
const password = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const speciality = ref<string>('')

const specialities = [
    'Addictologie',
    'Allergologie',
    'Anatomie et cytopathologie',
    'Anesthésie-réanimation',
    'Biologie médicale',
    'Dermatologie et vénérologie',
    'Endocrinologie-diabétologie-nutrition',
    'Génétique médicale',
]

const loading = ref<boolean>(false)

const errorAuthentication = ref<boolean>(false)
const errorMessage = ref<string>('')

async function submit() {
    try {
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
        createPrestataire({
            uid: response.user.uid,
            firstName: firstName.value,
            lastName: lastName.value,
            speciality: speciality.value,
        })
        errorAuthentication.value = false
        router.push('/')
    } catch (err: any) {
        errorAuthentication.value = true
        errorMessage.value = err.message
    }
}
</script>

<template>
    <VRow align="center" justify="center">
        <VCol cols="6">
            <h1>Création d'un compte prestataire</h1>
            <div class="d-flex mt-5">
                <p class="text-subtitle-1 mr-2">Déjà un compte ?</p>
                <RouterLink :to="{ name: 'Login' }" class="text-primary font-weight-bold text-subtitle-1">Se connecter</RouterLink>
            </div>
            <VForm @submit.prevent="submit" class="mt-5">
                <VRow justify="center">
                    <VTextField v-model="email" label="Adresse email" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="password" label="Mot de passe" type="password" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="firstName" label="Prénom" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="lastName" label="Nom" />
                </VRow>
                <VRow justify="center">
                    <VSelect v-model="speciality" :items="specialities" label="Specialite" />
                </VRow>
                <VRow justify="center">
                    <VCol cols="3" class="pa-0">
                      <VBtn block class="py-6" type="submit" :loading="loading">Créer</VBtn>
                    </VCol>
                </VRow>
                <VRow justify="center" v-if="errorAuthentication">
                    <VCol class="text-center mt-5 text-red font-weight-bold">
                        <p>{{ errorMessage }}</p>
                    </VCol>
                </VRow>
            </VForm>
        </VCol>
    </VRow>
</template>