# IO App

Very exciting app that does planning and stuff

# How to run

### Prerequesities

- `node >= v18.12.1`

### To start:

1. ```javascript
   yarn;
   ```

2. ```javascript
   yarn start
   ```
3. Scan the QR code in `Expo Go` app (available in Play Store and App Store)

# Code Styling

Upon launching the project in VSCode you should be prompted to install `prettier` and `eslint`, agree or install the extensions manually if the popup doesn't show.

Open VSCode settings, search for `Editor: Default Formatter` setting for the editor and set it to `EsLint`. It is also **highly** recommended to enable the "Reformat on save" option.
You also need to remember to enable `Eslint: Enable` and the `Eslint> Format: Enable` options in settings. If you commit code that doesn't match the prettier/eslint config I'm presonally going to kill you. I recommend using the searchbar when looking for settings.

You can also use other editors such as WebStorm, just install EsLint and Prettier and make sure Prettier is correctly using our `.prettierrc` config file.
