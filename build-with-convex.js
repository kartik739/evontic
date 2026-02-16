const { execSync } = require('child_process');

const isProduction = process.env.VERCEL_ENV === 'production';
const command = isProduction
    ? "npx convex deploy --cmd 'npm run build'"
    : "npm run build";

console.log(`Running build command: ${command}`);

try {
    execSync(command, { stdio: 'inherit' });
} catch (error) {
    process.exit(1);
}
