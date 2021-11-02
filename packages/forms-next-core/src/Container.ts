import {
    ContainerJson,
    ContainerModel,
    Executor,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    Items, RulesJson
} from './types';
import {getProperty, resolve, splitTokens} from './utils/JsonUtils';
import Scriptable from './Scriptable';
import {Action, Change, Controller} from './controller/Controller';
import RuleEngine from './rules/RuleEngine';

const findChild = (container: ContainerModel,
                   childName: string): FieldModel | FieldsetModel | undefined => {
    const entry = Object.entries(container.items).find(([key, element]) => {
        if (element.name === childName) {
            return true;
        } /*else if (element.isContainer && element.name?.length === 0) {
            return findChild(element as FieldsetModel, childName);
        }*/ else {
            return false;
        }
    });
    if (entry != null) {
        return entry[1];
    }
};

abstract class Container<T extends ContainerJson & RulesJson> extends Scriptable<T> implements ContainerModel, Executor {

    protected _children: Items<FieldModel | FieldsetModel>

    protected _data: any = null

    constructor(params: T,
                ruleEngine: RuleEngine,
                _createController?: (elem: FieldModel | FieldsetModel) => Controller) {
        super(params, ruleEngine);
        this._children = {};
        this.initialize(ruleEngine, _createController);
    }

    //todo : this should not be public
    get items(): { [key: string]: FieldModel | FieldsetModel } {
        return this._children;
    }

    get isContainer() {
        return true;
    }

    protected abstract _createChild(child: FieldsetJson | FieldJson,
                                    ruleEngine: RuleEngine,
                                    _createController?: (elem: FieldModel | FieldsetModel) => Controller): FieldModel | FieldsetModel

    get id() {
        return this._jsonModel.id || '';
    }

    protected initialize(ruleEngine: RuleEngine, _createController?: (elem: FieldModel | FieldsetModel) => Controller) {
        let items = this._jsonModel.items;
        Object.entries(items).map(([key, item]) => {
            const name = getProperty(item, 'name', key);
            item.name = name;
            const parentId = this.id.length > 0 ? this.id + '.' : '';
            const id = parentId + name; // currently name can not be empty
            const newItem = Object.assign(item, {id});
            let retVal: FieldModel | FieldsetModel = this._createChild(newItem, ruleEngine, _createController);
            Object.defineProperty(this._children, key, {
                get() {
                    return retVal;
                },
                enumerable: true
            });
            this._jsonModel.items[key] = { 'id' : id };
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
    executeAction(action: Action, context: any, trigger: (x: Action) => void): any {
        super.executeAction(action, context, trigger);
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

    importData(dataModel: any, contextualDataModel?: any) {
        let currentDataModel = null;
        if (this._jsonModel.dataRef !== 'none' && this._jsonModel.dataRef !== undefined) {
            currentDataModel = resolve(dataModel, this._jsonModel.dataRef) || {};
        } else if (this._jsonModel.dataRef === 'none') {
            currentDataModel = contextualDataModel;
        } else if ((this._jsonModel?.name || '').length > 0){
            currentDataModel = resolve(contextualDataModel, this._jsonModel.name || '') || {};
        }
        this.syncDataAndFormModel(dataModel, currentDataModel, 'importData');
    }

    //todo : empty data models are getting created. We should stop that.
    exportData(dataModel: any, contextualDataModel: any) {
        let currentDataModel = null;
        const name = this._jsonModel.name || '';
        if (this._jsonModel.dataRef !== 'none' && this._jsonModel.dataRef !== undefined) {
            currentDataModel = resolve(dataModel, this._jsonModel.dataRef, {});
        } else if (this._jsonModel.dataRef === 'none') {
            currentDataModel = contextualDataModel;
        } else if (name.length > 0) {
            currentDataModel = resolve(contextualDataModel, name, {});
        }
        this.syncDataAndFormModel(dataModel, currentDataModel, 'exportData');
    }

    /**
     * prefill the form with data on the given element
     * @param dataModel
     * @param contextualDataModel
     * @param operation
     */
    syncDataAndFormModel(dataModel : any, contextualDataModel: any, operation: string = 'importData') {
        Object.values(this.items).forEach(x => {
            if (operation === 'importData') {
                x.importData(dataModel, contextualDataModel);
            } else if (operation == 'exportData') {
                x.exportData(dataModel, contextualDataModel);
            } else {
                console.error(`Invalid sync operation ${operation}. It should be importData or exportData`);
            }
        });
    }
}

export default Container;
