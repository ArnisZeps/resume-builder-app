import { Client, Account, ID, Databases, Query, Storage, Permission, Role } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client, ID, Query };

const PROFILE_PICTURES_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_PROFILE_PICTURES_BUCKET_ID || '';

export function getProfilePicturePreviewUrl(fileId: string, size = 160) {
    const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1').replace(/\/$/, '');
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
    const bucketId = PROFILE_PICTURES_BUCKET_ID;
    if (!bucketId || !projectId || !fileId) return '';

    const url = new URL(`${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view`);
    console.log(url.toString());
    url.searchParams.set('project', projectId);
    void size;
    return url.toString();
}

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

export const appwriteDatabase = {
    async createDocument(collectionId: string, data: Record<string, unknown>, documentID?: string) {
        try {
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
                collectionId,
                documentID || ID.unique(),
                data
            );
            return { success: true, document: response };
        } catch (error: unknown) {
            console.error('Create document error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to create document';
            return { success: false, error: errorMessage };
        }
    },

    async getDocument(collectionId: string, documentId: string) {
        try {
            const response = await databases.getDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
                collectionId,
                documentId
            );
            return { success: true, document: response };
        } catch (error: unknown) {
            console.error('Get document error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to get document';
            return { success: false, error: errorMessage };
        }
    },

    async updateDocument(collectionId: string, documentId: string, data: Record<string, unknown>) {
        try {
            const response = await databases.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
                collectionId,
                documentId,
                data
            );
            return { success: true, document: response };
        } catch (error: unknown) {
            console.error('Update document error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to update document';
            return { success: false, error: errorMessage };
        }
    },

    async deleteDocument(collectionId: string, documentId: string) {
        try {
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
                collectionId,
                documentId
            );
            return { success: true };
        } catch (error: unknown) {
            console.error('Delete document error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete document';
            return { success: false, error: errorMessage };
        }
    },

    async listDocuments(collectionId: string, queries?: string[]) {
        try {
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
                collectionId,
                queries
            );
            return { success: true, documents: response.documents };
        } catch (error: unknown) {
            console.error('List documents error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to list documents';
            return { success: false, error: errorMessage };
        }
    }
}

export const appwriteStorage = {
    async uploadProfilePicture(file: File, userId: string) {
        try {
            const bucketId = PROFILE_PICTURES_BUCKET_ID;
            if (!bucketId) throw new Error('Missing Appwrite profile picture bucket id');

            // Appwrite Storage doesn't have real folders. If you want a "userId prefix" for organization,
            // the most compatible approach is to prefix the uploaded filename.
            // Note: Some systems may sanitize '/' in filenames; the prefix still remains useful for grouping.
            const prefixedFileName = `${userId}/${file.name || 'profile-picture'}`;
            let fileToUpload: File = file;
            try {
                fileToUpload = new File([file], prefixedFileName, { type: file.type, lastModified: file.lastModified });
            } catch {
                // If File constructor isn't available (older browsers), fall back to the original file.
                fileToUpload = file;
            }

            const permissions = [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId)),
            ];

            const response = await storage.createFile(bucketId, ID.unique(), fileToUpload, permissions);
            return { success: true, file: response };
        } catch (error: unknown) {
            console.error('Upload profile picture error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload profile picture';
            return { success: false, error: errorMessage };
        }
    },

    async deleteProfilePicture(fileId: string) {
        try {
            const bucketId = PROFILE_PICTURES_BUCKET_ID;
            if (!bucketId) throw new Error('Missing Appwrite profile picture bucket id');
            await storage.deleteFile(bucketId, fileId);
            return { success: true };
        } catch (error: unknown) {
            console.error('Delete profile picture error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete profile picture';
            return { success: false, error: errorMessage };
        }
    },
};