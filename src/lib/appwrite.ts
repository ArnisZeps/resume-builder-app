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
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      return { success: true, session: response };
    } catch (error: unknown) {
        console.log('Login error:', error);
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
  }
};
