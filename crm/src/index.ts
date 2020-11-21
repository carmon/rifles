// import { fileOpen } from 'browser-nativefs';

const rootEl = document.getElementById("root");
if (window.isSecureContext) {
  const button = document.createElement('button');
  button.addEventListener('click', async ev => {
    // Options are optional.
    const options = {
      // List of allowed MIME types, defaults to `*/*`.
      mimeTypes: ['image/*'],
      // List of allowed file extensions (with leading '.'), defaults to `''`.
      extensions: ['.png', '.jpg', '.jpeg', '.webp'],
      // Set to `true` for allowing multiple files, defaults to `false`.
      multiple: true,
      // Textual description for file dialog , defaults to `''`.
      description: 'Image files',
    };
    console.log(ev);
    // const res = await fileOpen(options);
    console.log(options);
  });
  button.textContent = 'Open file';
  
  rootEl.appendChild(button);
}    

console.log('Compiled JS has loaded!');