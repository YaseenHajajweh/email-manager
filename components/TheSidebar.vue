<template>
    <ClientOnly>
        <div class="sidebar flex-container flex-column">
            <div class="sidebar__logo">
                <img src="/Logo.svg" alt="logo">
            </div>
            <nav class="sidebar__nav flex-container flex-column flex-item">
                <NuxtLink to="/inbox" class="flex-container flex-align-center">
                    <img src="@/assets/images/icons/inbox.svg" alt="logo" class="sidebar__nav__icon">
                    inbox ({{ emailManagerStore.list.length }})
                </NuxtLink>
                <NuxtLink to="/archive" class="flex-container flex-align-center">
                    <img src="@/assets/images/icons/archive.svg" alt="logo" class="sidebar__nav__icon">
                    archive ({{ emailManagerStore.archived.length }})
                </NuxtLink>
                <span class="logout mt-auto flex-container flex-align-center ">
                    <img src="@/assets/images/icons/logout.svg" alt="logo" class="sidebar__nav__icon">
                    logout
                </span>
               
            </nav>
        </div>
    </ClientOnly>
</template>

<script setup>

import { useEmailManager } from '@/store/emailManager';

let emailManagerStore = useEmailManager();

</script>

<style lang="scss" scoped>
    @import '@/assets/scss/_variables.scss';
    .sidebar {
        padding: 20px 10px;
        background-color: $color-light-gray;
        border: 1px solid $color-border;
        &__logo{
            margin-bottom: 32px;
            padding-left: 14px;
        }
        &__nav{
            a{
                margin-bottom: 15px;
            }
            a,.logout {
                color: $color-gray;
                font-size: 16px;
                text-decoration: none;
                padding: 12px 24px;
                text-transform: capitalize;
                &.router-link-exact-active,&:hover {
                    background-color: $color-purple;
                    color: $color-black;
                    border-radius: 54px;
                }
            }
            &__icon{
                margin-right: 10px;
            }
        } 
    }
</style>