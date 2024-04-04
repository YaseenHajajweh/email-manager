// This script provides a reusable composition function `useApi` for making API requests within a Vue.js application.
// It leverages the Composition API, allowing components to easily fetch data and react to loading states.

import { useEmailManager } from '@/store/emailManager';

/**
 * Composition function to handle API requests and loading states.
 * 
 * @returns {Object} An object containing the `getData` method for API requests and a reactive `loading` state.
 */
export function useApi() {
    // Retrieve runtime configuration settings, which includes the API base URL.
    const runtimeConfig = useRuntimeConfig();
    // Extract the base URL for API calls from the runtime configuration.
    const baseUrl = runtimeConfig?.public?.appApiUrl;

    // Reactive reference to track loading state of API requests.
    const loading = ref(false);

    // Access the email manager store, potentially used for managing global loading indicators or email-related states.
    let emailManagerStore = useEmailManager();

    /**
     * Async function to fetch data from an API endpoint.
     * It updates the loading state and handles errors gracefully.
     * 
     * @param {string} url - The API endpoint to fetch data from.
     * @param {Object} data - Parameters to be sent with the request.
     * @param {string|null} key - Optional key to include in the request options.
     * @returns {Promise} - The response data from the API or an error object.
     */
    const getData = async (url = "", data = {}, key = null) => {
        if (!url) return Promise.reject("Provide API url!");

        // Indicate loading state globally and locally.
        emailManagerStore.isLoading(true);
        loading.value = true;

        let options = {
            baseURL: baseUrl,
            method: "GET",
            params: data,
        };
        if (key) options.key = key;

        try {
            // Perform the API request using Vue's useFetch API.
            const { data: response, error } = await useFetch(url, options);

            if (error.value) {
                throw error.value;
            }

            return response.value;
        } catch (error) {
            console.error("Fetching data error:", error);
            throw error;
        } finally {
            // Reset loading states after the request is completed or fails.
            emailManagerStore.isLoading(false);
            loading.value = false;
        }
    };

    return {
        getData,
        loading, // Expose the loading state
    };
}
