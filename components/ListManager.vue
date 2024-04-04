<template>
    <!-- ClientOnly ensures content is only rendered client-side, useful for JavaScript-driven interactions -->
    <ClientOnly>
        <!-- Email list presentation -->
        <ul class="email-list">
            <!-- Email action bar: shown only on the inbox route and when emails are selected -->
            <li class="email-list__actions flex-container flex-align-center" v-if="$route.name === 'inbox'">
                <div>
                    <!-- Checkbox to select or deselect all emails -->
                    <label for="selectAll" @click="toggleSelectAll">
                        <input type="checkbox" name="selectAll" :checked="allIsSelected" id="selectAll">
                    </label>
                    <span>emails selected {{ `(${selectedEmails.length})` }}</span>
                </div>
                <!-- EmailActions component for performing actions on selected emails -->
                <EmailActions v-if="selectedEmails.length" @archive="toggleArchiveSelected"
                    @read="toggleReadSelected" />
            </li>
            <!-- Listing each email -->
            <li v-for="(email, itemIndex) in emails" :key="itemIndex"
                :class="['email-list__item cursor-pointer flex-container flex-align-center', { 'email-list__item--opened': email.isRead }]">
                <!-- Checkbox to select an individual email, shown only in the inbox -->
                <label v-if="$route.name === 'inbox'" :for="email.id">
                    <input type="checkbox" :name="email.id" :checked="email.isSelected" :id="email.id"
                        @click="toggleEmailSelection(email.id)">
                </label>
                <!-- Email subject, clicking it opens the email in the drawer -->
                <span class="flex-item" @click="openEmail(email.id)">{{ email.subject }}</span>
            </li>
        </ul>
        <!-- TheDrawer component for displaying the selected email content -->
        <TheDrawer :isVisible="isDrawerOpen" @update:isVisible="updateVisibility">
            <template v-if="currentEmail">
                <!-- Drawer content with actions and the email details -->
                <div class="email-list__actions flex-container flex-align-center" v-if="$route.name === 'inbox'">
                    <!-- Close button for the drawer -->
                    <div @click="updateVisibility(false)" class="cursor-pointer">
                        <img src="@/assets/images/icons/close.svg" alt="Close icon" class="icon">
                        <span>Close (Esc)</span>
                    </div>
                    <!-- EmailActions for archive and read functionality within the drawer -->
                    <EmailActions @archive="toggleArchiveById" @read="toggleReadById" />
                </div>
                <!-- Displaying the selected email's content -->
                <div class="email-content">
                    <h3 class="email-content__subject">{{ currentEmail.subject }}</h3>
                    <p class="email-content__body">{{ currentEmail.body }}</p>
                </div>
            </template>
        </TheDrawer>
    </ClientOnly>
</template>

<script setup>
// Auto-imported ref from Vue's Composition API to create reactive references.
const emails = ref([]);
const allIsSelected = ref(false);
// Computes selected emails by filtering the list based on the isSelected flag.
const selectedEmails = computed(() => emails.value.filter(email => email.isSelected));

// Importing the email manager composable for interacting with the email store.
import { useEmailManager } from '@/store/emailManager';

// Instantiating the email manager store to manage and interact with email data.
let emailManagerStore = useEmailManager();

// Define component props, particularly for accepting a list of emails.
const props = defineProps({
    list: {
        type: Array,
        default: () => [],
    }
});

// State to control the visibility of the drawer component.
const isDrawerOpen = ref(false);
// Reactive reference to store the currently selected email.
const currentEmail = ref(null);

// Watcher setup to synchronize the component's email list with the passed prop.
watch(() => props.list, (newVal) => {
    emails.value = newVal;
}, { deep: true });

// Toggles the selection state of all emails.
const toggleSelectAll = () => {
    allIsSelected.value = !allIsSelected.value;
    emails.value.forEach(email => {
        email.isSelected = allIsSelected.value;
    });
};

// Marks all selected emails as read and updates the email manager store.
const toggleReadSelected = () => {
    selectedEmails.value.forEach(email => {
        email.isRead = true
    });
    emailManagerStore.addToList(emails.value.filter(email => !email.isRead));
};

// Archives all selected emails by updating their state and the email manager store.
const toggleArchiveSelected = () => {
    const emailsToBeArchived = emails.value.filter(email => email.isSelected && !email.isArchived);
    emailsToBeArchived.forEach(email => {
        email.isArchived = true;
    });
    emailManagerStore.addToArchived(emailsToBeArchived);
};

// Toggles the selection state of a single email.
const toggleEmailSelection = (emailId) => {
    const email = emails.value.find(email => email.id === emailId);
    if (email) {
        email.isSelected = !email.isSelected;
    }
};

// Function to handle the opening of an email, marking it as read and displaying it in the drawer.
const openEmail = (emailId) => {
    const email = emails.value.find(email => email.id === emailId);
    if (email) {
        email.isRead = true;  // Mark as read
        currentEmail.value = email;  // Set for display in the drawer
        isDrawerOpen.value = true;  // Open the drawer
        emailManagerStore.addToList(emails.value.filter(email => !email.isRead));
    }
};

// Updates the visibility state of the drawer and clears the current email if closed.
const updateVisibility = (visible) => {
    isDrawerOpen.value = visible;
    if (!visible) currentEmail.value = null;  // Clear current email on close
};

// Specialized toggle functions for archive and read actions within the drawer context.
const toggleArchiveById = () => {
    if (currentEmail.value) {
        currentEmail.value.isArchived = true;
        emailManagerStore.addToArchived([currentEmail.value]);
    }
};

const toggleReadById = () => {
    if (currentEmail.value) {
        currentEmail.value.isRead = true;
    }
};

</script>


<style lang="scss">
@import '@/assets/scss/_variables.scss';

.email-list {
    overflow: auto;
    height: 100%;

    &__actions {
        padding-right: 24px;
        position: sticky;
        top: 0px;
        background: white;

        label {
            padding: 20px 24px;
            padding-right: 0px;
            font-size: 14px;
            color: $color-black;
            display: inline-block;
        }

        span {
            text-transform: capitalize;
            margin-left: 12px;

        }

        &__item {
            margin-left: 40px;
        }
    }

    &__item {
        border-block: 1px solid $color-border;
        padding-right: 24px;

        &:hover {
            background-color: $color-cyan;
        }

        label {
            padding-left: 24px;
            padding-right: 0px;
            font-size: 14px;
            color: $color-black;
            display: inline-block;
        }

        span {
            text-transform: capitalize;
            margin-left: 22px;
            padding-block: 20px;
        }

        &--opened {
            background-color: $color-light-purple;
        }
    }
}

.email-content {
    margin-top: 32px;

    &__subject {
        font-size: 20px;
        margin-bottom: 20px;
        margin-top: 0px;
    }

    &__body {
        font-size: 14px;
    }
}
</style>