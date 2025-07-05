import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);

export { client, ID };

export const appwriteAuth = {
    async createAccount(email: string, password: string, name: string) {
        try {
            const response = await account.create(ID.unique(), email, password, name);
            return { success: true, user: response };
        } catch (error: unknown) {
            console.error('Account creation error:', error);
            let errorMessage = error instanceof Error ? error.message : 'Failed to create account';
            if (errorMessage.includes('A user with the same id, email, or phone already exists in this project.')) errorMessage = 'A user with this email already exists.';
            return {
                success: false,
                error: errorMessage
            };
        }
    },

    async login(email: string, password: string) {
        try {
            const existingUser = await this.getCurrentUser();
            if (existingUser.success) {
                return {
                    success: true,
                    session: null,
                    message: 'Already logged in',
                    user: existingUser.user
                };
            }

            const response = await account.createEmailPasswordSession(email, password);
            return { success: true, session: response };
        } catch (error: unknown) {
            console.error('Login error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            return {
                success: false,
                error: errorMessage
            };
        }
    },

    async getCurrentUser() {
        try {
            const user = await account.get();
            return { success: true, user };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to get user';
            return { success: false, error: errorMessage };
        }
    },

    async logout() {
        try {
            await account.deleteSession('current');
            return { success: true };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            return { success: false, error: errorMessage };
        }
    },

    async checkSession() {
        try {
            const user = await account.get();
            return { success: true, user, isLoggedIn: true };
        } catch {
            return { success: true, user: null, isLoggedIn: false };
        }
    }
};
