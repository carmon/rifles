// This file was generated DO NOT EDIT!
export const Entity = {
  components: ['string'],
  description: 'string',
  name: 'string',
  type: 'string',
};

export const Character = {
  ...Entity,
  country: 'string',
  group: 'string',
  type: '"character"',
};

export const Location = {
  ...Entity,
  position: {
    x: 'number',
    y: 'number',
  },
};

