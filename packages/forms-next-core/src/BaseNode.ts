import {
    Action,
    BaseJson,
    BaseModel,
    callbackFn,
    ContainerModel,
    FormModel,
    Primitives,
    Subscription
} from './types';
import {ExecuteRule} from './controller/Controller';

class ActionImplWithTarget implements Action {

    constructor(private _action: Action, private _target: BaseModel) {
    }

    public get type() {
        return this._action.type;
    }

    public get payload() {
        return this._action.payload;
    }

    public get metadata() {
        return this._action.metadata;
    }

    public get target() {
        return this._target;
    }

    public get isCustomEvent() {
        return this._action.isCustomEvent;
    }

    toString() {
        return this._action.toString();
    }
}


export abstract class BaseNode<T extends BaseJson> implements BaseModel {
    //@ts-ignore
    private _ruleNode: any

    private _callbacks: {
            [key: string]: callbackFn[]
    } = {}

    private _dependents: {node: BaseModel, subscription: Subscription }[] = [];
    protected _jsonModel: T & {id: string}

    get isContainer() {
        return false;
    }

    public constructor(params: T,
                       //@ts_ignore
                       private _options: {form: FormModel, parent: ContainerModel}) {
        this._jsonModel = {
            ...params,
            id: this.form.getUniqueId()
        };
    }

    abstract value: Primitives

    protected setupRuleNode() {
        this._ruleNode = new Proxy(this.directReferences(), this._proxyHandler());
    }

    directReferences() {
        return this;
    }

    getRuleNode() {
        return this._ruleNode;
    }

    private get(target: any, prop: string | Symbol) {
        if (prop === Symbol.toPrimitive) {
            return this.valueOf;
        } else if (typeof(prop) === 'string') {
            //look for property
            if (prop.startsWith('$')) {
                prop = prop.substr(1);
                //@ts-ignore
                // return only non functional properties in this object
                if (typeof this[prop] !== 'function') {
                    //@ts-ignore
                    return this[prop];
                }
            }
            //look in the items
            const res = target[prop];
            if (typeof res !== 'undefined') {
                return res;
            }
            //since currently rule grammar doesn't support '$' for properties. This needs to be removed
            //@ts-ignore
            if (typeof this[prop] !== 'function') {
                //@ts-ignore
                return this[prop];
            }
        }
    }

    private _proxyHandler = () => {
        return {
            get: (target: any, prop: string, receiver: any) => {
                const value = this.get(target, prop);
                return value;
            }
        };
    }

    get id() {
        return this._jsonModel.id;
    }

    get index(): number {
        return this.parent.indexOf(this);
    }

    get parent() {
        return this._options.parent;
    }

    get type() {
        return this._jsonModel.type;
    }

    get viewType() {
        return this._jsonModel.viewType || 'text-input';
    }

    get name() {
        return this._jsonModel.name;
    }

    get dataRef() {
        return this._jsonModel.dataRef;
    }

    get visible() {
        return this._jsonModel.visible;
    }

    set visible(v) {
        this._jsonModel.visible = v;
    }

    get form() {
        return this._options.form;
    }

    get ruleEngine() {
        return this.form.ruleEngine;
    }

    get label() {
        return this._jsonModel.label;
    }

    set label(l) {
        this._jsonModel = {
            ...this._jsonModel,
            label: l
        };
    }

    getState() {
        return {
            ...this._jsonModel
        };
    }

    subscribe(callback: callbackFn, eventName: string = 'change') {
        this._callbacks[eventName] = this._callbacks[eventName] || [];
        this._callbacks[eventName].push(callback);
        //console.log(`subscription added : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
        return {
            unsubscribe: () => {
                this._callbacks[eventName] = this._callbacks[eventName].filter(x => x !== callback);
                //console.log(`subscription removed : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
            }
        };
    }

    addDependent<T extends BaseJson>(action: Action) {
        if(this._dependents.find(({node}) => node === action.payload) === undefined) {
            const subscription = this.subscribe((change: Action) => {
                const changes = change.payload.changes;
                const propsToLook = ['value', 'items'];
                // @ts-ignore
                const isPropChanged = changes.findIndex(x => {
                    return propsToLook.indexOf(x.propertyName) > -1;
                }) > -1;
                if (isPropChanged) {
                    action.payload.dispatch(new ExecuteRule());
                }
            });
            this._dependents.push({node: action.payload, subscription});
        }
    }

    removeDependent<T extends BaseJson>(action: Action) {
        const index = this._dependents.findIndex(({node}) => node === action.payload);
        if(index > -1) {
            this._dependents[index].subscription.unsubscribe();
            this._dependents.splice(index, 1);
        }
    }

    abstract executeAction(action: Action): any

    dispatch(action: Action): void {
        let actionWithTarget: Action = new ActionImplWithTarget(action, this);
        this.form.getEventQueue().queue(this, actionWithTarget);
        this.form.getEventQueue().runPendingQueue();
    }

    notifyDependents(action: Action) {
        const handlers = this._callbacks[action.type] || [];
        handlers.forEach(x => {
            x(new ActionImplWithTarget(action, this));
        });
    }

    abstract importData(a: any, b: any) : any
    abstract exportData(a: any) : any
}