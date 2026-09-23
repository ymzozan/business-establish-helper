import nextEnv from '@next/env';
import { spawnSync } from 'node:child_process';

nextEnv.loadEnvConfig(process.cwd(), true);
const command = process.argv[2];
if (!['migrate', 'status'].includes(command)) {
  console.error('Usage: node scripts/database-command.mjs migrate|status');
  process.exit(1);
}
for (const key of ['KUYUMCU_DATABASE_URL', 'KUYUMCU_DATABASE_URL_UNPOOLED']) {
  if (!process.env[key]?.startsWith('postgres')) {
    console.error(`Missing PostgreSQL configuration: ${key}`);
    process.exit(1);
  }
}
const result = spawnSync(process.execPath, ['node_modules/prisma/build/index.js', 'migrate', command === 'migrate' ? 'deploy' : 'status'], { stdio: 'inherit', env: process.env });
process.exit(result.status ?? 1);
