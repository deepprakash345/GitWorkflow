import {
    ContainerJson,
    ContainerModel,
    Executor,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    RulesJson
} from './types';
import {deepClone, resolve} from './utils/JsonUtils';
import Scriptable from './Scriptable';
import {Action, Change, Controller, Initialize} from './controller/Controller';

abstract class Container<T extends ContainerJson & RulesJson> extends Scriptable<T> implements ContainerModel, Executor {

    protected _children: Array<FieldModel | FieldsetModel> = []
    //@ts-ignore
    protected _ruleContext: any
    protected _data: any = null
    private _itemTemplate: FieldsetJson | FieldJson | null = null;

    directReferences() {
        return this._ruleContext;
    }

    //todo : this should not be public
    get items() {
        return this._children;
    }

    private _hasDynamicItems() {
        return this._itemTemplate != null;
    }

    get isContainer() {
        return true;
    }

    protected abstract _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel

    private _addChildToRuleNode(child: any) {
        const self = this;
        const name = this.type == 'array' ? child.index + '' : (this.type == 'object') ? child.name || '' : '';
        if (name.length > 0) {
            Object.defineProperty(this._ruleContext, name, {
                get: () => {
                    if (self._hasDynamicItems()) {
                        self.ruleEngine.trackDependency(self);
                    }
                    return child.getRuleNode();
                },
                configurable: true,
                enumerable: true
            });
        }
    }

    private _addChild(itemJson: FieldJson | ContainerJson, index?: number) {
        if (typeof index !== 'number' || index > this._children.length) {
            index = this._children.length;
        }
        const itemTemplate = {
            index,
            ...deepClone(itemJson)
        };
        //@ts-ignore
        let retVal = this._createChild(itemTemplate, {parent: this});
        this._addChildToRuleNode(retVal);
        if (index === this._children.length) {
            this._children.push(retVal);
        } else {
            this._children.splice(index, 0, retVal);
            for (let i = index + 1; i < this._children.length; i++) {
                this._children[i].index = i;
                this._children[i].controller.dispatch(new Change(undefined));
                this._addChildToRuleNode(this._children[i]);
            }
        }
        return retVal;
    }

    protected initialize() {
        let items = this._jsonModel.items;
        this._ruleContext = this._jsonModel.type == 'array' ? [] : {};
        if (this._jsonModel.type == 'array' && items.length === 1) {
            this._itemTemplate = deepClone(items[0]);
            if (typeof (this._jsonModel.minItems) !== 'number') {
                this._jsonModel.minItems = 0;
            }
            if (typeof (this._jsonModel.maxItems) !== 'number') {
                this._jsonModel.maxItems = -1;
            }
            if (typeof (this._jsonModel.initialItems) !== 'number') {
                this._jsonModel.initialItems = 1;
            }
            for (let i = 0; i < this._jsonModel.initialItems; i++) {
                //@ts-ignore
                const retVal = this._addChild(this._itemTemplate);
                //@ts-ignore
                items[i] = {'id': retVal.id};
            }
        } else if (items.length > 0) {
            items.forEach((item, index) => {
                const retVal = this._addChild(item);
                //@ts-ignore
                items[index] = {'id': retVal.id};
            });
            this._jsonModel.minItems = this._children.length;
            this._jsonModel.maxItems = this._children.length;
            this._jsonModel.initialItems = this._children.length;
        }
        this.setupRuleNode();
    }

    private items2Json() {
        return this._children.map(elem => elem.json());
    }

    json() {
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
            const index = action.payload || this._children.length - 1;
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

    _dispatchActionToItems(context: any, action: Action, items: Array<FieldModel | FieldsetModel> = this.items) {
        items.forEach(x => {
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
        } else if ((this._jsonModel?.name || '').length > 0) {
            currentDataModel = resolve(contextualDataModel, this._jsonModel.name || '') || {};
        }
        this.syncDataAndFormModel(dataModel, currentDataModel, 'importData');
    }

    //todo : empty data models are getting created. We should stop that.
     exportData(dataModel: any) {
        const name = this._jsonModel.name || '';
        const isArray = this._jsonModel.type === 'array';
        let currentDataModel: any = isArray ? [] : {};
         for (const x of this._children) {
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
        }
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
    syncDataAndFormModel(dataModel: any, contextualDataModel: any, operation: string = 'importData') {
        let currentData: any = {};
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
