# Doc

```bash
npm pub 
// or 
npm run build
npm publish
```

# Develop on Moon

Add this with the path to your plugins
```json
{
  "id": 40,
  "packageName": "PATH_TP_YOUR_PLUGINS/moon-notion-plugin",
  "description": "Notion app",
  "fromPath": true, 
  "devMode": true, 
  "npmRegistryUrl": "https://npm.pkg.github.com",
  "npmRegistryConfig": {
    "auth": {
      "token": "GITHUB_TOKEN_IF_DEV_PRIVATE"
    }
  }
}
```

Run `yarn watch` in your plugin root, it will be auto build.
Open the settings to update the plugin
Then open the launcher to test it
You can also check the logs if you use them here
Use moon.log in `/Users/paolocastro/Library/Application Support/test-paolo-2/moon.log`