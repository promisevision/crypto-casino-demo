const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

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

async function listUsers() {
  const env = loadEnv();
  const uri = env.MONGODB_URI;
  const dbName = env.MONGODB_DB || 'crypto_casino_demo';

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('users');

    const allUsers = await users.find({}).toArray();

    console.log(`\n📊 Total users: ${allUsers.length}\n`);

    if (allUsers.length === 0) {
      console.log('❌ No users in database!');
    } else {
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

listUsers();
