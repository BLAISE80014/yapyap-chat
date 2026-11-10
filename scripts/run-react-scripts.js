const { spawnSync } = require('child_process');
const net = require('net');
const path = require('path');

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on('error', () => resolve(false));
    server.listen(port, '127.0.0.1', () => {
      server.close(() => resolve(true));
    });
  });
}

async function resolvePort() {
  if (process.env.PORT) {
    return process.env.PORT;
  }

  const preferredPort = 3000;
  for (let port = preferredPort; port < preferredPort + 20; port += 1) {
    if (await isPortAvailable(port)) {
      return String(port);
    }
  }

  return String(preferredPort);
}

(async () => {
  const scriptPath = path.join(__dirname, '..', 'node_modules', 'react-scripts', 'bin', 'react-scripts.js');
  const args = process.argv.slice(2);
  const env = { ...process.env };
  const existingOptions = env.NODE_OPTIONS ? env.NODE_OPTIONS.trim() : '';
  const legacyProvider = '--openssl-legacy-provider';
  env.NODE_OPTIONS = existingOptions ? `${existingOptions} ${legacyProvider}` : legacyProvider;

  if (!env.PORT) {
    env.PORT = await resolvePort();
  }

  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    stdio: 'inherit',
    env,
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  process.exit(result.status ?? 0);
})();
