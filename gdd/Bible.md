Los rifleros de Chubut (a.k.a Rocky Trip) Game Design Document
==============================================================

## Main goals
- 2D exploration rogue-like videogame
- Heavy and meaninfull emphasis on exploration and dialogue
- Tells the story about Chubut's riflemen, taking as much historical detail as possible
- Player has to reach to Colonia 17 de Octubre before food runs out, or riflemen die
- Game has two campaigns: 
    - one historical, educational and easy campaign 
    - one myth/folk/fantasy/metaphysical, rogue-like and harder campaign (unblocked after beating the first)
- There's an after after game, which is openning this repo for modding

## Campaign Designs

### Historical
Historical accuracy is imposible. Stick to the **known** facts. Game can twist here and there where there is a space. The difficulty of the historical approach is to make players follow the historical route and game characters take the decisions of the historical characters they represent. Some guidelines:

Expedition facts
- From October 14th 1885 to February 1th 1886, 111 days (3 months and 19 days)
- 29 explorers formed the pack: 19 welsh, 7 argentines, 2 germans, and 1 northamerican
- Some stories say there was 1 unidentified explorer
- Distance travelled is around 5000km (they made an average of 45km a day)

### Roguelike
Bring everything in. Chubut desert can go from dinasours (now alive), to desertors from the Conquista del Desierto, to gualichos, to starvation, to luz mala, to aliens. Some better defined contrains:
- Rogue-like AF, replayability, sudden deaths and retry, long term achievements, constant feature unlocking.
- Difficulty must skyrocket here, the first mode is a demo, a tutorial, this is the real challenging game.

## Game Design Annotations
Player will have full control of Rifleros group, and will move them as a caravan of 29 explorers. Each day will start with a complete **moving phase**, on which the user will have full control on the place of stopping (also _events could appear_ upon advancing on the trail). On **historical mode**, some rifleros may alert the player on distancing from the **original path**. When making stops, the game enters in **stopped phase**, where player can rest, consume rations, plan expeditions to nearby areas (check camp action list file).

The core of the game will be the map, after each played exploration after **the first one**, some parts of the map can be unlocked and zones could be afected for **previous plays**.

## Tech Tools
Game has a schema validator. JSON Editor. Future plans: encounter app, events app.
## Research
- Original path taken specifications

## Glossary
- Colonia 17 de Octubre
- Conquista del Desierto
- Gualichos
- Luz mala