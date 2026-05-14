// Test script to start server
const { spawn } = require('child_process');

console.log('Starting Jaliaskola backend server...');
console.log('Make sure to run: npm install');
console.log('Then visit: http://localhost:3000');

const server = spawn('node', ['server.js'], { stdio: 'inherit' });

server.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
});