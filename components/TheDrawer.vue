<!-- Drawer.vue -->
<template>
    <!-- 
      Drawer component template that conditionally renders based on the isVisible prop.
      The @click handler on the backdrop is used to close the drawer by updating isVisible to false.
      The .drawer__content div will stop the click event propagation to prevent the drawer from closing when it's clicked.
    -->
    <div  class="drawer__backdrop flex-container flex-align-center flex-justify-end"
        :class="{ 'visible': isVisible }" @click="close">
        <div class="drawer__content" :class="{ 'visible': isVisible }" @click.stop>
            <!-- Slot for injecting content into the drawer from parent components -->
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
// Importing necessary Composition API utilities for props and event emitting.
import { defineProps, defineEmits } from 'vue';

// Defining the component props, expecting a boolean for visibility control.
const props = defineProps({
    isVisible: Boolean
});

// Setting up the component to emit events, particularly for updating visibility.
const emit = defineEmits(['update:isVisible']);

// Function to close the drawer by emitting an event to update isVisible to false.
const close = () => {
    emit('update:isVisible', false);
};
// Function to handle the keydown event
const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        close();
    }
};

// Add event listener on component mount
onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

// Remove event listener on component unmount to prevent memory leaks
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped lang="scss">
/* Scoped styles for the drawer component */
.drawer {
    /* Additional padding around the drawer for visual appeal */
    padding: 32px;

    &__backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        transition: opacity 0.5s ease-in-out;
        opacity: 0;
        visibility: hidden;
        &.visible {
            visibility: visible;
            opacity: 1;
        }
    }

    &__content {
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        width: 59%;
        height: 100%;
        position: fixed;
        top: 0;
        right: -100%;
        transition: right 0.5s ease-in-out;
        .drawer__backdrop.visible & {
            right: 0px;
            transition: right 0.5s ease-in-out;
        }
    }
}
</style>