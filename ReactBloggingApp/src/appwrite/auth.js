import conf from "../config/configFile";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userId = ID.unique();
            console.log("Generated ID:", userId); // See actual value

             console.log("Creating account with:");
            console.log("userId:", userId, "length:", userId.length);
            console.log("email:", email);
            console.log("password:", password);
            console.log("name:", name);

            const userAccount = await this.account.create(
                userId, // Unique user ID
                email,       // User email
                password,    // User password
                name         // User name
            );

            if(userAccount) {
                return this.login({email, password});
            }
            else {
                return userAccount
            }
            
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            console.log("Logging in with:", email, password);
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login success:", session);

            return session;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async GetCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
};

const authService = new AuthService();

export default authService;