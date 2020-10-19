declare module 'dos-config' {
    interface Config {
        categories: string[];
        rootDir: string;
    }
    const config: Config;
    export default config;
} 