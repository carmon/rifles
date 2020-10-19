import * as config from 'dos-config';
import { readdir, readFile } from 'fs';
import { parseSchema, ValidationFn } from 'mural-schema';
import createLogger from './log';
import { Character, Entity } from './schemas';

const log = createLogger('VALIDATOR');

type Validator = {
    id: string;
    parse: ValidationFn;
}
const validators: { [key:string]: Validator} = {
    characters: {
        id: 'Character',
        parse: parseSchema(Character)
    }
};

const entity: Validator = {
    id: 'Entity',
    parse: parseSchema(Entity)
};

// Mod forced mode
const args = process.argv.filter(a => a.indexOf('/') === -1);
const rootDir = args.length ? args[0] : config.rootDir;

config.categories.forEach(typeDir => {
    const path = `./${rootDir}/${typeDir}/`; 
    readdir(path, { encoding: 'utf-8' }, (err, filenames) => {
        if (err) {
            log(err.message); 
            return;
        }
        const jsons = filenames.filter(el => /\.json$/.test(el))
        const validator = validators[typeDir] || entity;
        const type = typeDir.slice(0, typeDir.length - 1);
        jsons.forEach(fn => {
            readFile(`${path}/${fn}`, (err, data) => {
                if (err) {
                    log(err.message); 
                    return;
                }
                const str = data.toString();
                const obj = { ...JSON.parse(str), type };
                const errors = validator.parse(obj);
                if (errors.length) {
                    log(`Type ${type} ${fn} has failed:`, errors);
                    throw new Error("Tests have failed!");
                }
                log(`File ${fn} has passed ${validator.id} test.`);
            });
        });
    });
})
