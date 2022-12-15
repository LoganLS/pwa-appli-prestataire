<script setup lang="ts">
</script>

<template>
    <VRow>
        <VCol cols="12" class="text-right">
            <VBtn>
                <RouterLink :to="{ name: 'Home' }">Calendrier</RouterLink>
            </VBtn>

            <VBtn class="ml-15">
                <RouterLink :to="{ name: 'Map' }">Map</RouterLink>
            </VBtn>

            <VBtn class="ml-15">
                <RouterLink to="/logout">Se déconnecter</RouterLink>
            </VBtn>
        </VCol>
    </VRow>
</template>