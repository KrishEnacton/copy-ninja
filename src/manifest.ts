import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Copy Ninja',
  description: '',
  version: '0.1.0',
  manifest_version: 3,
  icons: {
    '16': 'img/CopyNinja.png',
    '32': 'img/CopyNinja.png',
    '48': 'img/CopyNinja.png',
    '128': 'img/CopyNinja.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/CopyNinja.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/CopyNinja.png'],
      matches: [],
    },
  ],
  permissions: ['storage', 'contextMenus'],
})
