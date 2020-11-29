import { fileOpen , fileSave } from 'https://unpkg.com/browser-nativefs';
import { capitalize } from './utils.js';

const rootEl = document.getElementById("root");

const title = document.createElement('h1');
title.textContent = "Rifleros JSON Editor";
rootEl.appendChild(title);

const description = document.createElement('p');
description.innerHTML = `Load a JSON data file to edit it\'s attributes. 
Check example file <a href="https://raw.githubusercontent.com/carmon/rifles/main/data/vanilla/characters/fontana.json" target="_blank">here</a>,
source code <a href="https://github.com/carmon/rifles/tree/main/jmod" target="_blank">here</a>.`;
rootEl.appendChild(description);

if (window.isSecureContext) {
  const button = document.createElement('button');
  button.textContent = 'Open JSON';
  button.addEventListener('click', async _ => {
    button.disabled = true;
    button.textContent = 'Loading...';
    if (document.forms[0]) {
      rootEl.removeChild(document.forms[0]);
    }
    const oldPath = document.getElementById('path');
    if (oldPath) {
      rootEl.removeChild(oldPath);
    }

    const file = await fileOpen({
      mimeTypes: ['application/json'],
      extensions: ['.json'],
      description: 'JSON data files',
    });

    const path = document.createElement('input');
    path.disabled = true;
    path.id = 'path';
    path.value = file.name;
    rootEl.appendChild(path);

    const json = await file.text();
    const obj = JSON.parse(json);
    const keys = Object.keys(obj);
    button.disabled = false;
    button.textContent = 'Open JSON';

    // Form
    const form = document.createElement('form');
    form.onsubmit = async (ev) => {
      ev.preventDefault();
      const inputs = form.getElementsByTagName('input');
      const data = new Array(inputs.length).fill(0).reduce((prev, _, i) => {
        const input = inputs.item(i);
        // Search for anidation
        if (input.id.includes('-')) {
          const [id] = input.id.split('-')
          return {
            ...prev,
            [id]: prev[id] ? [ ...prev[id], input.value] : [input.value],
          };
        }
        return {
          ...prev,
          [input.id]: input.value,
        };
      }, {});
      const res = Object.keys(data).reduce((prev, curr) => ({
        ...prev,
        [curr]: data[curr],
      }), {});
      const blob = new Blob([JSON.stringify(res, null, 2)], {type : 'application/json'});
      await fileSave(blob, {
        fileName: file.name,
        extensions: ['.json']
      })
    };
    form.name = 'form';

    const createLabel = (key: string) => {
      const label = document.createElement('label');
      label.htmlFor = key;
      label.textContent = capitalize(key);
      form.appendChild(label);
      return label;
    };

    const createInput = (key: string, type: 'string' | 'number', value: any) => {
      const input = document.createElement('input');
      input.id = key;
      input.name = key;
      input.type = type === 'string' ? 'text' : type;
      input.value = value;
      return input;
    };
    keys.forEach(k => {
      const label = createLabel(k);
      const addInputToLabel = (value: any, sub?: number) => {
        const type = typeof(value);
        if (type === 'string' || type === 'number') {
          label.appendChild(
            createInput(sub !== undefined ?`${k}-${sub}`: k, type, value)
          );
        }
      }
      if (Array.isArray(obj[k])) {
        obj[k].forEach((v: any, i: number) => addInputToLabel(v, i));
      } else {
        addInputToLabel(obj[k]);
      }
    });
    const save = document.createElement('button');
    save.textContent = 'Save changes';
    save.type = 'submit';
    form.appendChild(save);
    rootEl.appendChild(form);
  });
  rootEl.appendChild(button);
}

console.log('Compiled JS loaded!');