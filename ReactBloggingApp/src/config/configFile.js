const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),    
}

export default conf;