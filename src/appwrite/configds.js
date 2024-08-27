import { Client, Databases, Storage, ID } from "appwrite";
import config from "../config/config";


export class Servies{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteWriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(config.appwriteBucketId);
    }

    async getPost(slug){
        try {
            const result = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite servies :: getpost() :: ", error);
            return false;
        }
    }

    async getposts(quries = [Query.equal("status","active")]){  // syntax   
        try {

            return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,quries);
            
        } catch (error) {
            console.log("Appwrite servies :: getposts() :: ", error);
            return false;
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{title,content,featuredImage,status,userId})

        } catch (error) {
            console.log("Appwrite servies :: createpost() :: ", error);
            return false;
        }
    }

    async updatepost(slug, {title, content, status, featuredImage}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{title,content,status,featuredImage})
        } catch (error) {
            console.log("Appwrite servies :: updatepost() :: ", error);
            return false;
        }
    }

    async deletepost(slug){
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
            return true;
        } catch (error) {
            console.log("Appwrite servies :: deletepost() :: ", error);
            return false;
        }
    }

    // STORAGE SERVIES

    async uploadfile(file){
        try {
            await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite servies :: uploadfile() :: ", error);
            return false;
        }
    }

    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(config.appwriteBucketId,fileId)
        } catch (error) {
            console.log("Appwrite servies :: deletefile() :: ", error);
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            this.storage.getFilePreview(config.appwriteBucketId,fileId).href

        } catch (error) {
            console.log("Appwrite servies :: getfilepreview() :: ", error);
            return false;
        }
    }
}

const services = new Servies();

export default services;
