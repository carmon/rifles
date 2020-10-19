Los rifleros de Chubut/Rocky Trip data files
============================================

The purpose of this repository is to serialize all info contained in the game.

### Folder Structure

*./templates* is the folder for JSON assets templates (divided by category)
*./vanilla* is the JSON assets folder for vanilla version of the game ("""historically accurate""")
*./mods* is the JSON assets folder for more videogamey modifications (unlocked mode after user beats the game for the first time)

### File Structure

File will have a subfolder for each category, to be clearer to find. Every file will be a JSON, with
the inner attributes of each entity values. A schema validator (mural-schema) is runned during tests to
confirm every information is correct.

### Code Structure

All code will go into src folder, these are the more important files:

- types.ts: types for every entity in the game, from these file schema are created.
- validate.ts: schema validator, will run as `npm run test` (if tests fail info is wrong).
- create.ts: JSON file creator, grabs a category template and saves a into a named JSON in category folder.
