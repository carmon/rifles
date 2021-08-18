export type Entity = {
    components: string[];
    description: string;
    name: string;
    type: string;
};

export type Character = Entity & {
    country: string;
    group: string;
    nickname?: string;
    type: 'character';
    profession?: string;
}

// Post game value
export type Location = Entity & {
    position: {x: number, y: number };
}