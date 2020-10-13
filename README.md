Los rifleros de Chubut/Rocky Trip data files
============================================

The purpose of this repository is to serialize all info contained in the game.

### Folder Structure

*./vanilla* is the folder for vanilla version of the game ("""historically accurate""")
*./mods* is the folder for more videogamey modifications (unlocked mode after user beats the game for the first time)

### File Structure

File will have a subfolder for each category, to be clearer to find. Every file will be a JSON, with
the inner attributes of each entity values. A schema validator (mural-schema) is runned during tests to
confirm every information is correct.

### Type Structures
    
    - Entity (name, components list, description and type)
    - Character (entity + country and profession)

