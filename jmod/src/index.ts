import { createButton, createInput, createLabel } from './dom.js';
import { openFileLoader, saveToJSON } from './nativefs.js';

const root = document.getElementById("root");

const createHandleSubmit = (fileName: string, form: HTMLFormElement) => async (ev: Event) => {
  ev.preventDefault();
  const inputs = form.getElementsByTagName('input');
  const data = new Array(inputs.length).fill(0).reduce((prev, _, i) => {
    const input = inputs.item(i);
    // Search for anidation
    if (input.id.includes('-')) {
      const ids = input.id.split('-');
      const o = ids.reverse().reduce((p, c, i, a) => {
        const isArray = parseInt(c);
        if (!isNaN(isArray)) {
          const nKey = a[i+1];
          return prev[nKey] ? [...prev[nKey], input.value] : [input.value];
        }
        if (i) {
          const nKey = a[i+1];
          const pKey = a[i-1];
          if (prev[nKey] && prev[nKey][c] && prev[nKey][c][pKey]) {
            return { [c]: { [pKey]: [...prev[nKey][c][pKey], input.value]} };
          } 
          if (prev[nKey] && prev[nKey][c]){
            return { [c]: { ...prev[nKey][c], ...p } };
          }
          return { [c]: p };
        }
        return { [c]: input.value }; 
      }, {});
      return {
        ...prev,
        ...o,
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

  await saveToJSON(res, fileName);
};

const addAttributesToForm = (obj: any, parent: HTMLElement) => (rootKey: string) => {
  const key = rootKey.includes('-') 
    ? rootKey.split('-')[rootKey.split('-').length - 1]
    : rootKey;
  const label = createLabel({ key });
  const addInputToLabel = (value: any, id: string) => {
    const type = typeof(value);
    label.appendChild(
      createInput({
        id, 
        type: type === 'number' ? 'number' : 'text', 
        value
      })
    );
  };

  const value = obj[key];
  const type = typeof(value);
  if (type === 'object') {
    if (Array.isArray(value)) {
      value.forEach((v: any, i: number) => addInputToLabel(v, `${rootKey}-${i}`));
    } else {
      Object.keys(value).forEach(k => addAttributesToForm(value, label)(`${rootKey}-${k}`));
    }
  } else {
    addInputToLabel(value, rootKey);
  }
  parent.appendChild(label);
};

const nativefs = true;
if (nativefs && window.isSecureContext) {
  const button = createButton({
    onclick: async _ => {
      button.disabled = true;
      button.textContent = 'Loading...';

      // Remove old form & path if present
      if (document.forms[0]) root.removeChild(document.forms[0]);
      const oldPath = document.getElementById('path');
      if (oldPath) root.removeChild(oldPath);
      
      const { fileName, json } = await openFileLoader();
  
      // Create & append path
      root.appendChild(createInput({
        disabled: true,
        id: 'path',
        value: fileName
      }));

      button.disabled = false;
      button.textContent = 'Open JSON';
  
      // Form
      const form = document.createElement('form');
      form.onsubmit = createHandleSubmit(fileName, form);
      form.name = 'form';
  
      const obj = JSON.parse(json);
      Object.keys(obj).forEach(addAttributesToForm(obj, form));
  
      form.appendChild(createButton({
        text: 'Save changes',
        type: 'submit',
      }));
  
      root.appendChild(form);
    },
    text: 'Open JSON',
  });
  root.appendChild(button);
}

console.log('Compiled JS loaded!');