import { Client, Databases, ID } from "appwrite";
import { DATABASE_ID, DB_ENDPOINT, IP_URL, PROJECT_ID } from "../_assets/constants";


type Payload = {
    [key: string]: string;
};

export const getIpAddress = async () => {
    try {
        const response = await fetch(IP_URL);
        const data = await response.json();

        return data.ip;
    } catch (error) {
        return "Unable to retrieve IP address.";
    }
};

export const saveToDB = (payload: Payload, collectionId: string) => new Promise(async (resolve, reject) => {
    try {
        const client = new Client();
        client
            .setEndpoint(DB_ENDPOINT)
            .setProject(PROJECT_ID);

        const database = new Databases(client);

        await database.createDocument(
            DATABASE_ID, 
            collectionId, 
            ID.unique(), 
            payload
        );
        resolve(null);
    } catch (error) {
        reject(error);
    }
});