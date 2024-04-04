<template>
    <div class="loader flex-container flex-align-center flex-justify-center" v-if="loading">
        <span>loading ...</span>
    </div>
    <section class="container flex-container">
        <TheSidebar />
        <main class="flex-item">
            <h1 class="page-name">{{$route.name}}</h1>
            <NuxtPage />
        </main>
    </section>
</template>

<script setup>
import { useEmailManager } from '@/store/emailManager';

const emailManager = useEmailManager();
const loading = ref(false)
watch(() => emailManager.loading, (newLoadingState) => {
    loading.value = newLoadingState
  // Perform any additional actions when loading state changes
});
</script>

<style lang="scss">
    @import '@/assets/scss/_variables.scss';
    .loader {
        position: fixed;
        left: 0px;
        top: 0px;
        width:100%;
        height: 100%;
        background-color: rgba($color-purple, 0.8);
        z-index: 999;
        color: $color-black;
    }
    .container {
        min-height: 100vh;
        > .sidebar {
            width:22%;
        }
        main {
            height: 100vh;
            overflow: hidden;
            padding-top: 24px;
            border: 1px solid $color-border;
            .page-name {
                font-size: 32px;
                margin-bottom: 32px;
                padding-inline: 24px;
                text-transform: capitalize;
            }
        }
    }
</style>