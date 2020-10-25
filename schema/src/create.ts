const vars = process.argv.filter(a => a.indexOf('/') === -1);

const error = (message: string) => {
    console.log (`
    ERROR
    =====
    ${message}
    `);
    
    process.exit();
};

if (vars.length < 2) {
    error(`
    Command needs variables.
    Usage: 
        - npm run create [category] [filename]
    `);
}

const [category, filename] = vars;

import * as config from 'dos-config';
import { readFile, writeFile } from 'fs';
import createLogger from './log';

const log = createLogger('CREATOR');

readFile(`./templates/${category}.json`, (err, file) => {
    if (err) 
        return error(err.message);

    const str = file.toString();
    const obj = { ...JSON.parse(str), name: filename, type: category };
    
    writeFile(
        `./${config.rootDir}/${category}s/${filename}.json`, 
        JSON.stringify(obj, null, "\t"), 
        () => { log('File written.') });
});