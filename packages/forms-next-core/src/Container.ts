import {
    ContainerJson,
    ContainerModel,
    Executor,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel, FormModel,
    Items, RulesJson
} from './types';
import {deepClone, getProperty, resolve, splitTokens} from './utils/JsonUtils';
import Scriptable from './Scriptable';
import {Action, Change, Controller, FieldAdded} from './controller/Controller';

abstract class Container<T extends ContainerJson & RulesJson> extends Scriptable<T> implements ContainerModel, Executor {

    protected _children: Array<FieldModel | FieldsetModel> = []
    protected _data: any = null
    private _itemTemplate: FieldsetJson | FieldJson | null = null;

    abstract get form() : FormModel

    //todo : this should not be public
    get items() {
        if (this._jsonModel.items instanceof Array) {
            return this._children;
        } else {
            return Object.fromEntries(this._children.map(c => {
                return [c.name, c];
            }));
        }
    }

    get isContainer() {
        return true;
    }

    protected abstract _createChild(child: FieldsetJson | FieldJson,
                                    options : {index: number, parent: ContainerModel}): FieldModel | FieldsetModel

    get id() {
        return this._jsonModel.id || '';
    }

    private _addChild(itemJson: FieldJson | ContainerJson, options : {index: number, parent: ContainerModel}) {
        const id = this.form.getUniqueId();
        //@ts-ignore
        const itemTemplate = {
            id,
            ...deepClone(itemJson)
        };
        //@ts-ignore
        let retVal = this._createChild(itemTemplate, options);
        this._children.push(retVal);
        this.form.controller.dispatch(new FieldAdded(retVal));
        return retVal;
    }

    protected initialize() {
        let items = this._jsonModel.items;
        if (items instanceof Array) {
            if (items.length === 1) {
                this._itemTemplate = deepClone(items[0]);
                //@ts-ignore
                const retVal = this._addChild(this._itemTemplate, {index: 0, parent: this});
                //@ts-ignore
                this._jsonModel.items[0] = {'id' : retVal.id};
            } else if (items.length > 1) {
                items.forEach((item, index) => {
                    const retVal = this._addChild(item, {index, parent: this});
                    //@ts-ignore
                    items[index] = {'id': retVal.id};
                });
            }
        } else {
            Object.entries(items).forEach(([key, item], index) => {
                const name = getProperty(item, 'name', key);
                item.name = name;
                const retVal = this._addChild(item, {index, parent : this});
                //@ts-ignore
                this._jsonModel.items[key] = {'id': retVal.id};
            });
        }
    }

    private items2Json() {
        if (this._jsonModel.items instanceof Array) {
            return this._children.map(elem => elem.json());
        } else {
            return Object.fromEntries(this._children.map(elem => {
                return [elem.name, elem.json()];
            }));
        }
    }

    json(): T {
        return {
            ...super.json(),
            'items': this.items2Json()
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    executeAction(action: Action, context: any, trigger: (x: Action) => void): any {
        if (action.type === 'addInstance' && this._itemTemplate != null) {
            this._addChild(this._itemTemplate, {index: this._children.length, parent : this});
            trigger(new Change(undefined));
        }
        super.executeAction(action, context, trigger);
        if (action.metadata?.dispatch) {
            this._dispatchActionToItems(context, action);
        }
    }

    _dispatchActionToItems(context: any, action: Action, items: Items<FieldModel | FieldsetModel> = this.items) {
        Object.values(items).forEach(x => {
            x.controller.dispatch(action);
        });
    }

    abstract get controller(): Controller;

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
    exportData(dataModel: any) {
        const name = this._jsonModel.name || '';
        const isArray = this._jsonModel.items instanceof Array;
        let currentDataModel:any = isArray ? [] : {};
        this._children.forEach(x => {
            const data = x.exportData(dataModel);
            if (data != undefined) {
                let name = x.name || '';
                let dataRef = x.dataRef || '';
                if (dataRef === 'none') {
                    if (isArray) {
                        currentDataModel = [...currentDataModel, ...data];
                    } else {
                        currentDataModel = {...currentDataModel, ...data};
                    }
                } else if (name.length > 0 && !isArray) {
                    currentDataModel[name] = data;
                } else if (isArray) {
                    currentDataModel[x.index] = data;
                }
            }
        });
        if (this._jsonModel.dataRef !== 'none' && this._jsonModel.dataRef !== undefined) {
            currentDataModel = resolve(dataModel, this._jsonModel.dataRef, currentDataModel);
        } else {
            return currentDataModel;
        }
    }

    /**
     * prefill the form with data on the given element
     * @param dataModel
     * @param contextualDataModel
     * @param operation
     */
    syncDataAndFormModel(dataModel : any, contextualDataModel: any, operation: string = 'importData') {
        let currentData:any = {};
        this._children.forEach(x => {
            if (operation === 'importData') {
                x.importData(dataModel, contextualDataModel);
            } else {
                console.error(`Invalid sync operation ${operation}. It should be importData or exportData`);
            }
        });
    }
}

export default Container;
