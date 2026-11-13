import { defineConfig, devices } from '@playwright/test'

// End-to-end tests run against the real build, served the way production serves it
// (scripts/serve-dist.mjs: clean URLs and a true 404). Run `npm run build` first.
//
//   npm run test:e2e                    Chromium (desktop + phone)
//   ALL_BROWSERS=1 npm run test:e2e     adds Firefox and WebKit, if they are installed
//                                       (`npx playwright install firefox webkit`)
const PORT = 4173

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: 0,
  reporter: [['list']],
  timeout: 45_000,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'off',
    // No GPU in most test machines: let WebGL fall back to software.
    launchOptions: { args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] },
  },
  webServer: {
    command: `node scripts/serve-dist.mjs ${PORT}`,
    url: `http://127.0.0.1:${PORT}/robots.txt`,
    reuseExistingServer: true,
    timeout: 20_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    ...(process.env.ALL_BROWSERS
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'], launchOptions: {} } },
          { name: 'webkit', use: { ...devices['Desktop Safari'], launchOptions: {} } },
        ]
      : []),
  ],
})
