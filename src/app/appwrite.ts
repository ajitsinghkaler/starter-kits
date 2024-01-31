import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65b724b71100db2c1fde'); // Replace with your project ID

export const account = new Account(client);
