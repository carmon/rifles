export type Entity = {
    components: string[];
    description: string;
    name: string;
    type: string;
};

export type Character = Entity & {
    country: string;
    profession: string;
    type: 'character';
}