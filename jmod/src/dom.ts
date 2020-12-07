interface ButtonProps {
  onclick?: (ev: MouseEvent) => void;
  text: string;
  type?: string;
}
interface LabelProps {
  key: string;
  text?: string;
}

interface InputProps {
  disabled?: boolean;
  id: string;
  type?: 'text' | 'number';
  value: string;
};

export const createButton = ({ onclick, text, type }: ButtonProps) => {
  const button = document.createElement('button');
  button.onclick = onclick;
  button.textContent = text;
  button.type = type;
  return button;
};

export const createLabel = ({ key }: LabelProps) => {
  const label = document.createElement('label');
  label.htmlFor = key;
  label.textContent = key;
  return label;
};

export const createInput = ({ disabled, id, type, value }: InputProps) => {
  const input = document.createElement('input');
  input.disabled = !!disabled;
  input.id = id;
  input.type = type ? type : 'text';
  input.value = value;
  return input;
};