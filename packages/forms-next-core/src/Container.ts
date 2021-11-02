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
import {getProperty, resolve, splitTokens} from './utils/JsonUtils';
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

    protected abstract _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel

    get id() {
        return this._jsonModel.id || '';
    }

    private _addChild(itemJson: FieldJson | ContainerJson) {
        const id = this.form.getUniqueId();
        //@ts-ignore
        const itemTemplate = Object.assign({id}, itemJson);
        //@ts-ignore
        let retVal = this._createChild(itemTemplate);
        this._children.push(retVal);
        this.form.controller.dispatch(new FieldAdded(retVal));
        return retVal;
    }

    protected initialize() {
        let items = this._jsonModel.items;
        if (items instanceof Array) {
            //@ts-ignore
            this._itemTemplate = this._jsonModel.items[0];
            //@ts-ignore
            const retVal = this._addChild(this._itemTemplate);
            //@ts-ignore
            this._jsonModel.items[0] = {'id' : retVal.id};
        } else {
            Object.entries(items).map(([key, item]) => {
                const name = getProperty(item, 'name', key);
                item.name = name;
                const retVal = this._addChild(item);
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
            this._addChild(this._itemTemplate);
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
    exportData(dataModel: any, contextualDataModel: any) {
        let currentDataModel = null;
        const name = this._jsonModel.name || '';
        const emptyDataModel = this._jsonModel.items instanceof Array ? [] : {};
        if (this._jsonModel.dataRef !== 'none' && this._jsonModel.dataRef !== undefined) {
            currentDataModel = resolve(dataModel, this._jsonModel.dataRef, emptyDataModel);
        } else if (this._jsonModel.dataRef === 'none') {
            currentDataModel = contextualDataModel;
        } else if (name.length > 0) {
            currentDataModel = resolve(contextualDataModel, name, emptyDataModel);
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
        this._children.forEach(x => {
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
