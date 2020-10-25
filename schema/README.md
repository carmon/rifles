Los rifleros de Chubut schema validator
=======================================

### Code Structure

All code will go into src folder, these are the more important files:

- types.ts: types for every entity in the game, from these file schema are created.
- validate.ts: schema validator, will run as `npm run test` (if tests fail info is wrong).
- create.ts: JSON file creator, grabs a category template and saves a into a named JSON in category folder.