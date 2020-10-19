export default (prefix: string) => (...s: any[]) => {
    const r = s.reduce((p, c) => {
        if (typeof(c) === 'object') {
            return `${p} ${JSON.stringify(c)}`;
        }
        return `${p} ${c}`;
    }, '');
    console.log(`[${prefix}]:: ${r}`);
};