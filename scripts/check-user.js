const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

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

async function checkUser() {
  const env = loadEnv();
  const uri = env.MONGODB_URI;
  const dbName = env.MONGODB_DB || 'crypto_casino_demo';

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('users');

    const user = await users.findOne({ email: 'admin@email.com' });

    if (!user) {
      console.log('❌ User not found!');
    } else {
      console.log('\n✅ User found:');
      console.log('Email:', user.email);
      console.log('Name:', user.name);
      console.log('Role:', user.role);
      console.log('Password Hash:', user.password);

      // Test password comparison
      const testPassword = 'casino@demo';
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log('\n🔑 Password Test:');
      console.log('Test password:', testPassword);
      console.log('Match result:', isMatch ? '✅ CORRECT' : '❌ WRONG');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

checkUser();
