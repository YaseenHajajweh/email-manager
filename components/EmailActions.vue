<template>
    <div class="ml-auto flex-container flex-align-center">
        <div class="flex-container flex-align-center cursor-pointer email-list__actions__item"
            @click="toggleReadSelected">
            <img src="@/assets/images/icons/envelop.svg" alt="logo" class="email-list__actions__icon">
            <span>
                Mark as read (r)
            </span>
        </div>
        <div class="flex-container flex-align-center cursor-pointer email-list__actions__item"
            @click="toggleArchiveSelected">
            <img src="@/assets/images/icons/envelop.svg" alt="logo" class="email-list__actions__icon">
            <span>
                Archive (a)
            </span>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(['read','archive']);

    const toggleReadSelected = () => {
        emit('read', false);
    };
    const toggleArchiveSelected = () => {
        emit('archive', false);
    };
    // Function to handle the keydown event
    const handleKeydown = (event) => {
        if (event.key === 'r') {
            toggleReadSelected();
        }
        if (event.key === 'a') {
            toggleArchiveSelected();
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

<style>

</style>