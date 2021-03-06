'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Singleton(target) {
    IoCContainer.bind(target).scope(Scope.Singleton);
}
exports.Singleton = Singleton;
function Scoped(scope) {
    return function (target) {
        IoCContainer.bind(target).scope(scope);
    };
}
exports.Scoped = Scoped;
function Provided(provider) {
    return function (target) {
        IoCContainer.bind(target).provider(provider);
    };
}
exports.Provided = Provided;
function Provides(target) {
    return function (to) {
        IoCContainer.bind(target).to(to);
    };
}
exports.Provides = Provides;
function AutoWired(target) {
    const newConstructor = InjectorHanlder.decorateConstructor(target);
    const config = IoCContainer.bind(target);
    config.toConstructor(newConstructor);
    return newConstructor;
}
exports.AutoWired = AutoWired;
function Inject(...args) {
    if (args.length < 3 || typeof args[2] === 'undefined') {
        return InjectPropertyDecorator.apply(this, args);
    }
    else if (args.length === 3 && typeof args[2] === 'number') {
        return InjectParamDecorator.apply(this, args);
    }
    throw new Error('Invalid @Inject Decorator declaration.');
}
exports.Inject = Inject;
function InjectPropertyDecorator(target, key) {
    let t = Reflect.getMetadata('design:type', target, key);
    if (!t) {
        t = Reflect.getMetadata('design:type', target.constructor, key);
    }
    IoCContainer.injectProperty(target.constructor, key, t);
}
function InjectParamDecorator(target, propertyKey, parameterIndex) {
    if (!propertyKey) {
        const config = IoCContainer.bind(target);
        config.paramTypes = config.paramTypes || [];
        const paramTypes = Reflect.getMetadata('design:paramtypes', target);
        config.paramTypes.unshift(paramTypes[parameterIndex]);
    }
}
class Container {
    static bind(source) {
        if (!IoCContainer.isBound(source)) {
            AutoWired(source);
            return IoCContainer.bind(source).to(source);
        }
        return IoCContainer.bind(source);
    }
    static get(source) {
        return IoCContainer.get(source);
    }
    static snapshot(source) {
        const config = Container.bind(source);
        Container.snapshots.providers.set(source, config.iocprovider);
        if (config.iocscope) {
            Container.snapshots.scopes.set(source, config.iocscope);
        }
        return;
    }
    static restore(source) {
        if (!(Container.snapshots.providers.has(source))) {
            throw new TypeError('Config for source was never snapshoted.');
        }
        const config = Container.bind(source);
        config.provider(Container.snapshots.providers.get(source));
        if (Container.snapshots.scopes.has(source)) {
            config.scope(Container.snapshots.scopes.get(source));
        }
    }
}
Container.snapshots = {
    providers: new Map(),
    scopes: new Map(),
};
exports.Container = Container;
class IoCContainer {
    static isBound(source) {
        checkType(source);
        const baseSource = InjectorHanlder.getConstructorFromType(source);
        const config = IoCContainer.bindings.get(baseSource);
        return (!!config);
    }
    static bind(source) {
        checkType(source);
        const baseSource = InjectorHanlder.getConstructorFromType(source);
        let config = IoCContainer.bindings.get(baseSource);
        if (!config) {
            config = new ConfigImpl(baseSource);
            IoCContainer.bindings.set(baseSource, config);
        }
        return config;
    }
    static get(source) {
        const config = IoCContainer.bind(source);
        if (!config.iocprovider) {
            config.to(config.source);
        }
        return config.getInstance();
    }
    static injectProperty(target, key, propertyType) {
        const propKey = `__${key}`;
        Object.defineProperty(target.prototype, key, {
            enumerable: true,
            get: function () {
                return this[propKey] ? this[propKey] : this[propKey] = IoCContainer.get(propertyType);
            },
            set: function (newValue) {
                this[propKey] = newValue;
            }
        });
    }
    static assertInstantiable(target) {
        if (target['__block_Instantiation']) {
            throw new TypeError('Can not instantiate Singleton class. ' +
                'Ask Container for it, using Container.get');
        }
    }
}
IoCContainer.bindings = new Map();
function checkType(source) {
    if (!source) {
        throw new TypeError('Invalid type requested to IoC ' +
            'container. Type is not defined.');
    }
}
class ConfigImpl {
    constructor(source) {
        this.source = source;
    }
    to(target) {
        checkType(target);
        const targetSource = InjectorHanlder.getConstructorFromType(target);
        if (this.source === targetSource) {
            const configImpl = this;
            this.iocprovider = {
                get: () => {
                    const params = configImpl.getParameters();
                    if (configImpl.decoratedConstructor) {
                        return (params ? new configImpl.decoratedConstructor(...params) : new configImpl.decoratedConstructor());
                    }
                    return (params ? new target(...params) : new target());
                }
            };
        }
        else {
            this.iocprovider = {
                get: () => {
                    return IoCContainer.get(target);
                }
            };
        }
        if (this.iocscope) {
            this.iocscope.reset(this.source);
        }
        return this;
    }
    provider(provider) {
        this.iocprovider = provider;
        if (this.iocscope) {
            this.iocscope.reset(this.source);
        }
        return this;
    }
    scope(scope) {
        this.iocscope = scope;
        if (scope === Scope.Singleton) {
            this.source['__block_Instantiation'] = true;
            scope.reset(this.source);
        }
        else if (this.source['__block_Instantiation']) {
            delete this.source['__block_Instantiation'];
        }
        return this;
    }
    withParams(...paramTypes) {
        this.paramTypes = paramTypes;
        return this;
    }
    toConstructor(newConstructor) {
        this.decoratedConstructor = newConstructor;
        return this;
    }
    getInstance() {
        if (!this.iocscope) {
            this.scope(Scope.Local);
        }
        return this.iocscope.resolve(this.iocprovider, this.source);
    }
    getParameters() {
        if (this.paramTypes) {
            return this.paramTypes.map(paramType => IoCContainer.get(paramType));
        }
        return null;
    }
}
class Scope {
    reset(source) {
    }
}
exports.Scope = Scope;
class LocalScope extends Scope {
    resolve(provider, source) {
        return provider.get();
    }
}
Scope.Local = new LocalScope();
class SingletonScope extends Scope {
    resolve(provider, source) {
        let instance = SingletonScope.instances.get(source);
        if (!instance) {
            source['__block_Instantiation'] = false;
            instance = provider.get();
            source['__block_Instantiation'] = true;
            SingletonScope.instances.set(source, instance);
        }
        return instance;
    }
    reset(source) {
        SingletonScope.instances.delete(InjectorHanlder.getConstructorFromType(source));
    }
}
SingletonScope.instances = new Map();
Scope.Singleton = new SingletonScope();
class InjectorHanlder {
    static decorateConstructor(target) {
        let newConstructor;
        newConstructor = class ioc_wrapper extends target {
            constructor(...args) {
                super(...args);
                IoCContainer.assertInstantiable(target);
            }
        };
        newConstructor['__parent'] = target;
        return newConstructor;
    }
    static getConstructorFromType(target) {
        let typeConstructor = target;
        if (typeConstructor['name'] && typeConstructor['name'] !== 'ioc_wrapper') {
            return typeConstructor;
        }
        while (typeConstructor = typeConstructor['__parent']) {
            if (typeConstructor['name'] && typeConstructor['name'] !== 'ioc_wrapper') {
                return typeConstructor;
            }
        }
        throw TypeError('Can not identify the base Type for requested target');
    }
}
//# sourceMappingURL=es6.js.map