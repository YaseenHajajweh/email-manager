<template>
    <!--
      This template uses the ListManager component to display a list of archived emails.
      The :list prop is used to pass the archived emails data to the ListManager for rendering.
    -->
    <ListManager :list="archived"/>
  </template>
  
  <script setup>
  // Imports the useEmailManager composable to interact with the email store.
  import { useEmailManager } from '@/store/emailManager';
  
  // Accesses the emailManager store using the useEmailManager composable.
  let emailManagerStore = useEmailManager();
  
  // Creates a reactive reference for archived emails. Note: 'ref' is auto-imported in Nuxt 3.
  const archived = ref([]);
  
  // The onMounted lifecycle hook is used to populate the archived emails
  // from the emailManagerStore once the component is mounted.
  onMounted(() => {
      // Retrieves the archived emails from the emailManagerStore and assigns them to the archived ref.
      archived.value = emailManagerStore.archived;
  });
  
  </script>
  
  <style>
  /* Styles for the .inbox class ensuring it is statically positioned. */
  .inbox {
      position: static;
  }
  </style>
  