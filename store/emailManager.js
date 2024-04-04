
import { defineStore } from 'pinia';

export const useEmailManager = defineStore('emailManager', {
    state: () => ({
        list: [],
        archived: [],
        loading: false,
    }),
    actions: {
        isLoading(data) {
            this.loading = data;
        },
        addToList(data) {
            this.list = data;
        },
        addToArchived(emailsToArchive) {
            // Add emails to the archived array without duplication
            emailsToArchive.forEach(email => {
                if (!this.archived.find(archivedEmail => archivedEmail.id === email.id)) {
                    this.archived.push(email);
                }
            });

            // update the list to reflect that these emails are archived.
            this.list = this.list.map(email => {
                if (emailsToArchive.find(e => e.id === email.id)) {
                    return { ...email, isArchived: true };
                }
                return email;
            });
        }
    }
});


