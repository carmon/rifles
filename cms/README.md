Los rifleros de Chubut JSON CRM
===============================

The purpose of this app is to be a kick JSON -> HTML FORM -> JSON CRM.
Some goals stuff thinked for this app:

- Grabs schema and render input in pure HTML form
- Category should be a different page/tab
- Filename selector, if none selected save button should be a save-to-file browser form

Current version:
    
- Uses browser file loader and file saver for editing JSON data files 
- Vercel online version [here](https://rifles-cms.vercel.app/)

CRM Project
===========

I decided to advance with a little nodejs app, based on TS.
It uses [browser-nativefs](https://github.com/GoogleChromeLabs/browser-nativefs) lib for opening and saving the files.

## Commands

- **npm run build** to build TS to JS
- **npm start** to run a http-server with CMS