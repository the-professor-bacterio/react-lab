import 'reflect-metadata';
export declare function Singleton(target: Function): void;
export declare function Scoped(scope: Scope): (target: Function) => void;
export declare function Provided(provider: Provider): (target: Function) => void;
export declare function Provides(target: Function): (to: Function) => void;
export declare function AutoWired(target: Function): any;
export declare function Inject(...args: any[]): any;
export declare class Container {
    private static snapshots;
    static bind(source: Function): Config;
    static get(source: Function): any;
    static snapshot(source: Function): void;
    static restore(source: Function): void;
}
export interface Config {
    to(target: Object): Config;
    provider(provider: Provider): Config;
    scope(scope: Scope): Config;
    withParams(...paramTypes: any[]): Config;
}
export interface Provider {
    get(): Object;
}
export declare abstract class Scope {
    static Local: Scope;
    static Singleton: Scope;
    abstract resolve(provider: Provider, source: Function): any;
    reset(source: Function): void;
}
