<template>
    <ClientOnly>
        <h1>Posts</h1>
        <ul>
            <li v-for="email in emails" :key="email.id">
                {{ email.subject }}
            </li>
        </ul>
    </ClientOnly>
</template>

<script setup>
const emails = ref([]);
(async () => {
    let { getData } = useApi()

    let response = await getData("/list/emails")
    .then(async (response) => {
        return response;
    })
    .catch((error) => {
        console.error('error from /list/emails', error)
    });
    if (response) {
        emails.value = response;
    }
})();
</script>