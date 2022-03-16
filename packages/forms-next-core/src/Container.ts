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
import {deepClone} from './utils/JsonUtils';
import Scriptable from './Scriptable';
import {ExecuteRule, Initialize, propertyChange} from './controller';
import DataGroup from './data/DataGroup';


/**
 * Defines a generic container class which any form container should extend from.
 * @typeparam T type of the node which extends {@link ContainerJson} and {@link RulesJson}
 */
abstract class Container<T extends ContainerJson & RulesJson> extends Scriptable<T> implements ContainerModel {

    protected _children: Array<FieldModel | FieldsetModel> = []
    //@ts-ignore
    protected _childrenReference: any

    private _itemTemplate: FieldsetJson | FieldJson | null = null;

    //@ts-ignore
    protected _jsonModel : T & {
        id: string,
        items: Array<FieldJson & {id: string} | ContainerJson & {id: string}>
    }

    /**
     * @private
     */
    ruleNodeReference() {
        return this._childrenReference;
    }

    //todo : this should not be public
    get items() {
        return this._children;
    }

    set maxItems(m: number) {
        this._jsonModel.maxItems = m;
        const minItems = this._jsonModel.minItems || 1;
        const itemsLength = this._children.length;
        const items2Remove = Math.min(itemsLength - m, itemsLength - minItems);
        if (items2Remove > 0) {
            for (let i = 0; i < items2Remove; i++) {
                (this.getDataNode() as DataGroup).$removeDataNode(m + i);
                this._childrenReference.pop();
            }
            const elems = this._children.splice(m, items2Remove);
            this.notifyDependents(propertyChange('items', elems, null));
        }
    }

    /**
     * returns whether the items in the Panel can repeat or not
     */
    hasDynamicItems() {
        return this._itemTemplate != null;
    }

    get isContainer() {
        return true;
    }

    /**
     * Returns the current container state
     */
    getState() {
        return {
            ...this._jsonModel,
            ':type' : this[':type'],
            items: this._children.map(x => {
                return { ...x.getState() };
            })
        };
    }

    protected abstract _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel

    private _addChildToRuleNode(child: any) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        //the child has not been added to the array, hence using the length as new index
        const name = this.type == 'array' ? this._children.length + '' : (this.type == 'object') ? child.name || '' : '';
        if (name.length > 0) {
            Object.defineProperty(this._childrenReference, name, {
                get: () => {
                    if (child.isContainer && child.hasDynamicItems()) {
                        self.ruleEngine.trackDependency(child); //accessing dynamic panel directly
                    }
                    if (self.hasDynamicItems()) {
                        self.ruleEngine.trackDependency(self); //accessing a child of dynamic panel
                        if (this._children[name] !== undefined) { // pop function calls this getter in order to return the item
                            return this._children[name].getRuleNode();
                        }
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
        const retVal = this._createChild(itemTemplate, {parent: this, index: index});
        this._addChildToRuleNode(retVal);
        if (index === this._children.length) {
            this._children.push(retVal);
            //(this.getDataNode() as DataGroup).$addDataNode(index);
        } else {
            this._children.splice(index, 0, retVal);
            //(this.getDataNode() as DataGroup).$addDataNode();
        }
        retVal._initialize();
        return retVal;
    }

    indexOf(f: FieldModel | FieldsetModel): number {
        return this._children.indexOf(f);
    }

    /**
     * @private
     */
    defaultDataModel(name: string) {
        const type = this._jsonModel.type || 'object';
        const instance = type === 'array' ? [] : {};
        return new DataGroup(name, instance, type);
    }

    /**
     * @private
     */
    _initialize() {
        super._initialize();
        const items = this._jsonModel.items;
        this._jsonModel.items = [];
        this._childrenReference = this._jsonModel.type == 'array' ? [] : {};
        if (this._jsonModel.type == 'array' && items.length === 1 && this.getDataNode() != null) {
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
            items.forEach((item) => {
                this._addChild(item);
            });
            this._jsonModel.minItems = this._children.length;
            this._jsonModel.maxItems = this._children.length;
            this._jsonModel.initialItems = this._children.length;
        }
        this.setupRuleNode();
    }

    /**
     * @private
     */
    addItem(action: Action) {
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

    /**
     * @private
     */
    removeItem(action: Action) {
        if (action.type === 'removeItem' && this._itemTemplate != null) {
            const index = action.payload || this._children.length - 1;
            const state = this._children[index].getState();
            //@ts-ignore
            if (this._children.length > this._jsonModel.minItems) {
                // clear child
                //remove field
                this._childrenReference.pop();
                this._children.splice(index, 1);
                (this.getDataNode() as DataGroup).$removeDataNode(index);
                for (let i = index; i < this._children.length; i++) {
                    this._children[i].dispatch(new ExecuteRule());
                }
                this.notifyDependents(propertyChange('items', null, state));
            }
        }
    }

    /**
     * @private
     */
    queueEvent(action: Action) {
        super.queueEvent(action);
        if (action.metadata?.dispatch) {
            this.items.forEach(x => {
                //@ts-ignore
                x.queueEvent(action);
            });
        }
    }

    validate() {
        return this.items.flatMap(x => {
            return x.validate();
        }).filter(x => x.fieldName !== '');
    }

    /**
     * @private
     */
    dispatch(action: Action): void {
        super.dispatch(action);
        if (action.metadata?.dispatch) {
            this.items.forEach(x => {
                x.dispatch(action);
            });
        }
    }

    /**
     * @private
     */
    importData(contextualDataModel?: DataGroup) {
        this._bindToDataModel(contextualDataModel);
        this.syncDataAndFormModel(this.getDataNode() as DataGroup);
    }

    /**
     * prefill the form with data on the given element
     * @param dataModel
     * @param contextualDataModel
     * @param operation
     * @private
     */
    syncDataAndFormModel(contextualDataModel?: DataGroup) {
        if (contextualDataModel?.$type === 'array' && this._itemTemplate != null) {
            const dataLength = contextualDataModel?.$value.length;
            const itemsLength = this._children.length;
            const maxItems = this._jsonModel.maxItems === -1 ? dataLength : this._jsonModel.maxItems;
            const minItems = this._jsonModel.minItems;
            //@ts-ignore
            let items2Add = Math.min(dataLength - itemsLength, maxItems - itemsLength);
            //@ts-ignore
            const items2Remove = Math.min(itemsLength - dataLength, itemsLength - minItems);
            while (items2Add > 0) {
                items2Add--;
                this._addChild(this._itemTemplate);
            }
            if (items2Remove > 0) {
                this._children.splice(dataLength, items2Remove);
                for (let i = 0; i < items2Remove; i++) {
                    this._childrenReference.pop();
                }
            }
        }
        this._children.forEach(x => {
            x.importData(contextualDataModel);
        });
    }
}

export default Container;
