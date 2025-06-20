require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runMigration() {
  try {
    // Wait for 5 seconds to give the database time to start
    await sleep(5000);
    execSync('npx prisma migrate dev --name add-lead-model', { stdio: 'inherit' });
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();