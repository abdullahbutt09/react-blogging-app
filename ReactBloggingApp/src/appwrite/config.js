import { use } from "react";
import conf from "../config/configFile";

import { Client, Databases, ID , Storage , Query , Account} from "appwrite";
console.log("✅ Appwrite Project ID:", conf.appwriteProjectId); // <-- Add this here
export class AppwriteService {
    client = new Client();
    
    databases;
    storage;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
        this.account = new Account(this.client); // ✅ ADD THIS LINE
    }

    async createPost({title , slug , content , featuredImage , status}) {
        try {
            const user = await this.account.get(); // get logged-in user's ID
            const post = await this.databases.createDocument(

                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                ID.unique(), // Unique document ID
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userid: user.$id, // User ID of the post creator
                }
            );
            return post;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async UpdatePost({postId , title , slug , content , featuredImage , status}) {
        try {
            const post = await this.databases.updateDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                postId, // Document ID
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status
                }
            );
            return post;
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }

    async DeletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                postId // Document ID
            );
            return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    }

    async getPost({postId}) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                postId // Document ID
            );
            return post;
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                queries // Queries to filter the posts
            );
            return posts;
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            const response = await this.storage.createFile(
                conf.appwriteBucketId, // Bucket ID
                ID.unique(), // Unique file ID
                file // File to upload
            );
            return response;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId, // Bucket ID
                fileId // File ID
            );
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }

    getFileView(fileId) {
    try {
        // This returns a URL object immediately
        return this.storage.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
        console.error("Error getting file preview:", error);
        return null;
    }
}

}   

const service = new AppwriteService();

export default service;