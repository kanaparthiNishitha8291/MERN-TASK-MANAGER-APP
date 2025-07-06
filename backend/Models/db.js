require('dotenv').config();
const { MongoClient } = require('mongodb');

const DB_URL = process.env.DB_URL;

async function connectToMongoDB() {
    try {
        const client = new MongoClient(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        console.log('✅ MongoDB is Connected...');

        // Optionally get a specific database
        const db = client.db('your-database-name');

        // Test: list collections
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        // Remember to close when you're done (or keep open if your app continues)
        // await client.close();

    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
    }
}

connectToMongoDB();