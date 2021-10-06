import {
    ContainerJson,
    ContainerModel,
    Dispatcher,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    Items, RulesJson
} from './types';
import {getProperty, splitTokens} from './utils/JsonUtils';
import Scriptable from './Scriptable';
import {Action, Controller} from './controller/Controller';

const findChild = (container: ContainerModel,
                   childName: string): FieldModel | FieldsetModel | undefined => {
    const entry = Object.entries(container.items).find(([key, element]) => {
        if (element.name === childName) {
            return true;
        } else if (element.isContainer && element.name?.length === 0) {
            return findChild(element as FieldsetModel, childName);
        } else {
            return false;
        }
    });
    if (entry != null) {
        return entry[1];
    }
};

abstract class Container<T extends ContainerJson & RulesJson> extends Scriptable<T> implements ContainerModel, Dispatcher {

    protected _children: Items<FieldModel | FieldsetModel>

    constructor(params: T, _createController?: (elem: FieldModel | FieldsetModel) => Controller) {
        super(params);
        this._children = {};
        this.initialize(_createController);
    }

    //todo : this should not be public
    get items(): { [key: string]: FieldModel | FieldsetModel } {
        return this._children;
    }

    get isContainer() {
        return true;
    }

    protected abstract _createChild(child: FieldsetJson | FieldJson,
                                    _createController?: (elem: FieldModel | FieldsetModel) => Controller): FieldModel | FieldsetModel

    get id() {
        return this._jsonModel.id || '';
    }

    protected initialize(_createController?: (elem: FieldModel | FieldsetModel) => Controller) {
        let items = this._jsonModel.items;
        Object.entries(items).map(([key, item]) => {
            const name = getProperty(item, 'name', '');
            const parentId = this.id.length > 0 ? this.id + '.' : '';
            const id = name.length > 0 ? parentId + name : undefined;
            const newItem = Object.assign(item, {id});
            let retVal: FieldModel | FieldsetModel = this._createChild(newItem, _createController);
            Object.defineProperty(this._children, key, {
                get() {
                    return retVal;
                },
                enumerable: true
            });
            this._jsonModel.items[key] = retVal.json();
        });
    }

    public getElement(id: string): FieldModel | ContainerModel | undefined {
        if (id === undefined) {
            return undefined;
        }
        if (id == this.id) {
            return this;
        }
        let child: FieldModel | ContainerModel | undefined = this;
        let tokens = splitTokens(id);
        let token = tokens.next();
        while (!token.done && child != undefined) {
            if (child?.isContainer) {
                child = findChild(child as ContainerModel, token.value);
            } else {
                child = undefined;
            }
            token = tokens.next();
        }
        return child;
    }

    private items2Json() {
        return Object.fromEntries(Object.entries(this.items).map(([key, elem]) => {
            return [key, elem.json()];
        }));
    }

    json(): T {
        return {
            ...super.json(),
            'items': this.items2Json()
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch(action: Action, context: any, trigger: (x: Action) => void): any {
        super.dispatch(action, context, trigger);
        if (action.metadata?.dispatch) {
            this._dispatchActionToItems(context, action);
        }
    }

    _dispatchActionToItems(context: any, action: Action, items: Items<FieldModel | FieldsetModel> = this.items) {
        Object.values(items).forEach(x => {
            x.controller()?.dispatch(action);
        });
    }

    abstract controller(): Controller;
}

export default Container;
