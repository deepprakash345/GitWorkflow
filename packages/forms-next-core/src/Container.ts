import {
    Action,
    ContainerJson,
    ContainerModel,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    RulesJson
} from './types';
import {deepClone, resolve} from './utils/JsonUtils';
import Scriptable from './Scriptable';
import {resolveData, Token, tokenize} from './utils/DataRefParser';
import {ExecuteRule, Initialize, propertyChange} from './controller/Controller';

abstract class Container<T extends ContainerJson & RulesJson> extends Scriptable<T> implements ContainerModel {

    protected _children: Array<FieldModel | FieldsetModel> = []
    //@ts-ignore
    protected _ruleContext: any
    protected _data: any = null

    private _parentData: any = null;
    private _itemTemplate: FieldsetJson | FieldJson | null = null;
    private _tokens: Token[] = []

    //@ts-ignore
    protected _jsonModel : T & {
        id: string,
        items: Array<FieldJson & {id: string} | ContainerJson & {id: string}>
    }

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

    getState() {
        return {
            ...this._jsonModel,
            items: this._children.map(x => {
                return {id : x.id, viewType: x.viewType};
            })
        };
    }

    protected abstract _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel

    private _addChildToRuleNode(child: any) {
        const self = this;
        //the child has not been added to the array, hence using the length as new index
        const name = this.type == 'array' ? this._children.length + '' : (this.type == 'object') ? child.name || '' : '';
        if (name.length > 0) {
            Object.defineProperty(this._ruleContext, name, {
                get: () => {
                    if (child.isContainer && child._hasDynamicItems()) {
                        self.ruleEngine.trackDependency(child); //accessing dynamic panel directly
                    }
                    if (self._hasDynamicItems()) {
                        self.ruleEngine.trackDependency(self); //accessing a child of dynamic panel
                        return this._children[name];
                    } else {
                        return child.getRuleNode();
                    }
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
        }
        return retVal;
    }

    indexOf(f: FieldModel | FieldsetModel): number {
        return this._children.indexOf(f);
    }

    protected _initialize(items: Array<FieldJson | FieldsetJson>) {
        //let items = this._jsonModel.items;
        this._jsonModel.items = [];
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
                this._jsonModel.initialItems = Math.max(1, this._jsonModel.minItems);
            }
            for (let i = 0; i < this._jsonModel.initialItems; i++) {
                //@ts-ignore
                this._addChild(this._itemTemplate);
            }
        } else if (items.length > 0) {
            items.forEach((item, index) => {
                this._addChild(item);
            });
            this._jsonModel.minItems = this._children.length;
            this._jsonModel.maxItems = this._children.length;
            this._jsonModel.initialItems = this._children.length;
        }
        this.setupRuleNode();
    }

    addItem(action: Action, context: any) {
        if (action.type === 'addItem' && this._itemTemplate != null) {
            //@ts-ignore
            if ((this._jsonModel.maxItems === -1) || (this._children.length < this._jsonModel.maxItems)) {
                const retVal = this._addChild(this._itemTemplate, action.payload);
                this.notifyDependents(propertyChange('items', retVal.getState, null));
                retVal.dispatch(new Initialize());
                retVal.dispatch(new ExecuteRule());
            }
        }
    }

    removeItem(action: Action, context: any) {
        if (action.type === 'removeItem' && this._itemTemplate != null) {
            const index = action.payload || this._children.length - 1;
            var state = this._children[index].getState();
            //@ts-ignore
            if (this._children.length > this._jsonModel.minItems) {
                // clear child
                //remove field
                this._children.splice(index, 1);
                for (let i = index; i < this._children.length; i++) {
                    this._children[i].dispatch(new ExecuteRule());
                }
                this._ruleContext.pop();
                this.notifyDependents(propertyChange('items', null, state));
            }
        }
    }

    dispatch(action: Action): void {
        super.dispatch(action);
        if (action.metadata?.dispatch) {
            this.items.forEach(x => {
                x.dispatch(action);
            });
        }
    }

    importData(dataModel: any, contextualDataModel?: any) {
        const type = this._jsonModel.type;
        const instance = type === 'array' ? [] : {};
        const dataRef = this._jsonModel.dataRef;
        if (dataRef === null) {
            this._data = null;
        } else if (dataRef !== undefined) {
            if (this._tokens.length === 0) {
                this._tokens = tokenize(dataRef);
            }
            const {result, parent} = resolveData(dataModel, this._tokens, instance);
            this._data = result;
            this._parentData = parent;
        } else {
            if (contextualDataModel != null) {
                this._parentData = contextualDataModel;
                const name = this._jsonModel.name || '';
                const key = contextualDataModel instanceof Array ? this.index : name;
                if (key !== '') {
                    this._data = this._parentData[key] || instance;
                    this._parentData[key] = this._data;
                }
            }
        }
        this.syncDataAndFormModel(dataModel, this._data, 'importData');
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
                if (dataRef === null) {
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
        if (this._data instanceof Array && this._itemTemplate != null) {
            const dataLength = this._data.length;
            const itemsLength = this._children.length;
            const maxItems = this._jsonModel.maxItems === -1 ? dataLength : this._jsonModel.maxItems;
            const minItems = this._jsonModel.minItems;
            //@ts-ignore
            let items2Add = Math.min(dataLength - itemsLength, maxItems - itemsLength);
            //@ts-ignore
            let items2Remove = Math.min(itemsLength - dataLength, itemsLength - minItems);
            while (items2Add > 0) {
                items2Add--;
                this._addChild(this._itemTemplate);
            }
            if (items2Remove > 0) {
                this._children.splice(dataLength, items2Remove);
                const newItems: any[] = this._jsonModel.items.slice(0, dataLength);
                this._jsonModel = {
                    ...this._jsonModel,
                    items: newItems
                };
                for (let i = 0; i < items2Remove; i++) {
                    this._ruleContext.pop();
                }
            }
        }
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
