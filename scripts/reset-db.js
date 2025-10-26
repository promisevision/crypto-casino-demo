const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};

  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });

  return env;
}

async function resetDatabase() {
  const env = loadEnv();
  const uri = env.MONGODB_URI;
  const dbName = env.MONGODB_DB || 'crypto_casino_demo';

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);

    // Save admin user if exists
    const usersCollection = db.collection('users');
    const adminUser = await usersCollection.findOne({ email: env.ADMIN_EMAIL || 'admin@email.com' });

    if (adminUser) {
      console.log('💾 Found admin user, will preserve it');
    }

    // Drop all collections except we'll restore admin
    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log('No collections to drop. Database is already empty.');
    } else {
      for (const collection of collections) {
        await db.collection(collection.name).drop();
        console.log(`✅ Dropped collection: ${collection.name}`);
      }
    }

    // Restore admin user if it existed
    if (adminUser) {
      await db.collection('users').insertOne(adminUser);
      console.log('✅ Restored admin user');
    }

    console.log('\n🎉 Database reset complete!');
    if (adminUser) {
      console.log('\n👑 Admin user preserved: admin@email.com');
      console.log('👤 You can sign up new users with any email/password');
    } else {
      console.log('\nYou can now sign up:');
      console.log('👑 Admin: admin@email.com / casino@demo');
      console.log('👤 User: any other email/password');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('\n✅ Connection closed');
  }
}

resetDatabase();
