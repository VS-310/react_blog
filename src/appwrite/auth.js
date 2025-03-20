import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      console.log("Creating account...");
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      console.log("Account created:", userAccount);

      if (userAccount) {
        return await this.login({ email, password });
      }
      return userAccount;
    } 
    catch (error) {
      console.error("Appwrite Service :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      console.log("Logging in...");
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("Session created:", session);
      return session;
    } 
    catch (error) {
      console.error("Appwrite Service :: login :: error", error);
      throw error;
    }
  }

  async getAccount() {
    try {
      console.log("Fetching account...");
      const account = await this.account.get();
      console.log("Account details:", account);
      return account;
    } 
    catch (error) {
      console.error("Appwrite Service :: getAccount :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      console.log("Logging out...");
      await this.account.deleteSessions();
      console.log("Logged out successfully");
    } 
    catch (error) {
      console.error("Appwrite Service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
