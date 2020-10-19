export type Entity = {
    components: string[];
    description: string;
    name: string;
    type: string;
};

export type Character = Entity & {
    country: string;
    group: string;
    type: 'character';
}

// Post game value
export type Location = Entity & {
    position: {x: number, y: number };
}