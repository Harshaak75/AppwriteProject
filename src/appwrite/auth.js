import config from "../config/config";
import { Client, Account } from "appwrite";

export class Authservices{

    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(config.appwriteWriteUrl)
        .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try{
            const user_account = await this.account.create(ID.unique(), email, password, name);

            if(user_account){
                return this.login({email, password});
            }
            else{
                return user_account;
            }
        }
        catch(error){
            console.error('Error creating account', error);
        }
    }
    async login({email,password}){
        try{
            const promises = await this.account.createEmailPasswordSession(email,password)

            if(promises){
                console.log("Successfully created")
            }
            else{
                return promise;
            }
        }
        catch(error){
            console.error('Error logging in', error);
        }
        
    }
    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.error('Error logging out', error);
        }
        
    }
    async getCount(){
        try{
            return await this.account.get()
        }
        catch(error){
            console.error('Error getting count', error);
        }
    } 
}


const authServies = new Authservices();

export default authServies;