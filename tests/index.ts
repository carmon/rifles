import { readdir, readFile } from 'fs';
import { parseSchema, ValidationFn } from 'mural-schema';
import { Character, Entity } from './schemas';

const log = (...s: any[]) => {
    const r = s.reduce((p, c) => {
        if (typeof(c) === 'object') {
            return `${p} ${JSON.stringify(c)}`;
        }
        return `${p} ${c}`;
    }, '');
    console.log(`index.ts :: ${r}`);
};

const ROOT_DIR = 'vanilla';
const OBJECT_TYPES = [
    'characters',
    'locations'
];

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

OBJECT_TYPES.forEach(typeDir => {
    const path = `./${ROOT_DIR}/${typeDir}/`; 
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
