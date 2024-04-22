# Plugin Development

Moon Jot is base on a plugin system that make easy to develop your own integration and workflows

# Develop on Moon

Add this with the path to your plugins to `/Users/{USER_NAME}/Library/Application Support/moon.jot/moon-settings.json` in the you `settings.plugins.list` array
```json
{
  "id": 40,
  "name": "Name of the app",
	"packageName": "{PATH_TO}/moon-sample-plugin", // path to the plugin
	"description": "Sample app",
	"fromPath": true, // if you packages name is develop locally
	"devMode": true, // allow auto refresh before each use
  "npmRegistryUrl": "https://npm.pkg.github.com", // if you use GITHUB as registry (otherwise you can remove that if npm)
  "npmRegistryConfig": {
    "auth": {
      "token": "GITHUB_TOKEN_IF_DEV_PRIVATE" // if GITHUB is the registry
    }
  }
}
```

Run `yarn watch` in your plugin root, it will be auto build.
Open the settings to update the plugin
Then open the launcher to test it
You can also check the logs if you use them here
Use moon.log in `/Users/{USER_NAME}/Library/Application Support/moon.jot/moon.log`

## Useful commands

```bash
yarn pub 
// or 
yarn run build
yarn publish
```