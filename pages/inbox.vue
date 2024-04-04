<template>
    <!--
      The template uses the ListManager component to display a list of emails.
      The :list prop passes the emails data to the ListManager component for rendering.
    -->
    <ListManager :list="emails"/>
  </template>
  
  <script setup>
  
  
  // Imports the useEmailManager composable from the emailManager store module.
  import { useEmailManager } from '@/store/emailManager';
  
  
  // Initializes the emails ref to hold the email list.
  const emails = ref([]);
  
  // Instantiates the emailManagerStore to interact with the email store.
  let emailManagerStore = useEmailManager();
  
  // Immediately invoked async function to fetch emails upon component setup.
  (async () => {
      // Destructures the getData function from the useApi composable result.
      let { getData } = useApi();
  
      try {
          // Fetches email data from the API and updates the emails ref with the response.
          let response = await getData("/list/emails");
          emails.value = response;
  
          // Updates the email list in the emailManagerStore.
          emailManagerStore.addToList(emails.value);
          
      } catch (error) {
          // Logs any errors that occur during the API call to the console.
          console.error('error from /list/emails', error);
      }
  })();
  </script>
  
  <style>
    /* Styles for the inbox container, ensuring it has a static position. */
    .inbox {
        position: static;
    }
  </style>
  