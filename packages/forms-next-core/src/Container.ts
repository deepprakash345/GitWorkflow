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
import {deepClone, getProperty, resolve} from './utils/JsonUtils';
import Scriptable from './Scriptable';
import {Action, Change, Controller, FieldAdded, Initialize} from './controller/Controller';

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

    protected _hasDynamicItems() {
        return this._itemTemplate != null;
    }

    get isContainer() {
        return true;
    }

    protected abstract _createChild(child: FieldsetJson | FieldJson,
                                    options : {index: number, parent: ContainerModel}): FieldModel | FieldsetModel

    get id() {
        return this._jsonModel.id || '';
    }

    private _addChild(itemJson: FieldJson | ContainerJson, index?: number) {
        const id = this.form.getUniqueId();
        if (typeof index !== 'number' || index > this._children.length) {
            index = this._children.length;
        }
        const itemTemplate = {
            id,
            index,
            ...deepClone(itemJson)
        };
        //@ts-ignore
        let retVal = this._createChild(itemTemplate, {parent: this});
        if (index === this._children.length) {
            this._children.push(retVal);
        } else {
            this._children.splice(index, 0, retVal);
            for (let i = index + 1; i < this._children.length; i++) {
                this._children[i].index = i;
                this._children[i].controller.dispatch(new Change(undefined));
            }
        }
        this.form.controller.dispatch(new FieldAdded(retVal));
        return retVal;
    }

    protected initialize() {
        let items = this._jsonModel.items;
        if (items instanceof Array) {
            if (items.length === 1) {
                this._itemTemplate = deepClone(items[0]);
                if (typeof(this._jsonModel.minItems) !== 'number') {
                    this._jsonModel.minItems = 0;
                }
                if (typeof(this._jsonModel.maxItems) !== 'number') {
                    this._jsonModel.maxItems = -1;
                }
                if (typeof(this._jsonModel.initialItems) !== 'number'){
                    this._jsonModel.initialItems = 1;
                }
                for (let i =0; i < this._jsonModel.initialItems; i++) {
                    //@ts-ignore
                    const retVal = this._addChild(this._itemTemplate);
                    items[i] = {'id' : retVal.id};
                }
            } else if (items.length > 1) {
                items.forEach((item, index) => {
                    const retVal = this._addChild(item);
                    //@ts-ignore
                    items[index] = {'id': retVal.id};
                });
            }
        } else {
            Object.entries(items).forEach(([key, item]) => {
                const name = getProperty(item, 'name', key);
                item.name = name;
                const retVal = this._addChild(item);
                //@ts-ignore
                this._jsonModel.items[key] = {'id': retVal.id};
            });
        }
        if (!(items instanceof Array) || items.length > 1) {
            this._jsonModel.minItems = this._children.length;
            this._jsonModel.maxItems = this._children.length;
            this._jsonModel.initialItems = this._children.length;
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
        if (action.type === 'AddItem' && this._itemTemplate != null) {
            //@ts-ignore
            if ((this._jsonModel.maxItems === -1) || (this._children.length < this._jsonModel.maxItems)) {
                const retVal = this._addChild(this._itemTemplate, action.payload);
                trigger(new Change(undefined));
                retVal.controller.dispatch(new Initialize());
                retVal.controller.dispatch(new Change(undefined));
            }
        } else if (action.type === 'RemoveItem' && this._itemTemplate != null) {
            const index =  action.payload || this._children.length - 1;
            //@ts-ignore
            if (this._children.length > this._jsonModel.minItems) {
                this._children.splice(index, 1);
            }
            for (let i = index; i < this._children.length; i++) {
                this._children[i].index = i;
                this._children[i].controller.dispatch(new Change(undefined));
            }
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
                    if (isArray && data instanceof Array) {
                        currentDataModel = [...currentDataModel, ...data];
                    } else if (!isArray) {
                        currentDataModel = {...currentDataModel, ...data};
                    } else {
                        currentDataModel[x.index] = data;
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
