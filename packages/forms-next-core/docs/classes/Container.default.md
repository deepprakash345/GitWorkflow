# Class: default<T\>

[Container](../modules/Container.md).default

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ContainerJson`](../modules/types_Json.md#containerjson) & [`RulesJson`](../modules/types_Json.md#rulesjson) |

## Hierarchy

- [`default`](Scriptable.default.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`Fieldset`](Fieldset.Fieldset-1.md)

  ↳↳ [`default`](Form.default.md)

## Implements

- [`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

## Table of contents

### Methods

- [\_bindToDataModel](Container.default.md#_bindtodatamodel)
- [\_createChild](Container.default.md#_createchild)
- [\_initialize](Container.default.md#_initialize)
- [\_setProperty](Container.default.md#_setproperty)
- [addDependent](Container.default.md#adddependent)
- [addItem](Container.default.md#additem)
- [defaultDataModel](Container.default.md#defaultdatamodel)
- [directReferences](Container.default.md#directreferences)
- [dispatch](Container.default.md#dispatch)
- [executeAction](Container.default.md#executeaction)
- [executeAllRules](Container.default.md#executeallrules)
- [executeRule](Container.default.md#executerule)
- [getDataNode](Container.default.md#getdatanode)
- [getRuleNode](Container.default.md#getrulenode)
- [getState](Container.default.md#getstate)
- [importData](Container.default.md#importdata)
- [indexOf](Container.default.md#indexof)
- [notifyDependents](Container.default.md#notifydependents)
- [queueEvent](Container.default.md#queueevent)
- [removeDependent](Container.default.md#removedependent)
- [removeItem](Container.default.md#removeitem)
- [setupRuleNode](Container.default.md#setuprulenode)
- [subscribe](Container.default.md#subscribe)
- [syncDataAndFormModel](Container.default.md#syncdataandformmodel)

### Properties

- [\_children](Container.default.md#_children)
- [\_jsonModel](Container.default.md#_jsonmodel)
- [\_ruleContext](Container.default.md#_rulecontext)
- [value](Container.default.md#value)

### Constructors

- [constructor](Container.default.md#constructor)

### Accessors

- [dataRef](Container.default.md#dataref)
- [form](Container.default.md#form)
- [id](Container.default.md#id)
- [index](Container.default.md#index)
- [isContainer](Container.default.md#iscontainer)
- [items](Container.default.md#items)
- [label](Container.default.md#label)
- [maxItems](Container.default.md#maxitems)
- [name](Container.default.md#name)
- [parent](Container.default.md#parent)
- [ruleEngine](Container.default.md#ruleengine)
- [rules](Container.default.md#rules)
- [type](Container.default.md#type)
- [viewType](Container.default.md#viewtype)
- [visible](Container.default.md#visible)

## Methods

### \_bindToDataModel

▸ **_bindToDataModel**(`contextualDataModel?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel?` | `default` |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[_bindToDataModel](Scriptable.default.md#_bindtodatamodel)

___

### \_createChild

▸ `Protected` `Abstract` **_createChild**(`child`): [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`FieldJson`](../modules/types_Json.md#fieldjson) \| [`FieldsetJson`](../modules/types_Json.md#fieldsetjson) |

#### Returns

[`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

___

### \_initialize

▸ **_initialize**(): `void`

#### Returns

`void`

#### Implementation of

ContainerModel.\_initialize

#### Overrides

Scriptable.\_initialize

___

### \_setProperty

▸ **_setProperty**<`T`\>(`prop`, `newValue`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `string` |
| `newValue` | `T` |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[_setProperty](Scriptable.default.md#_setproperty)

___

### addDependent

▸ **addDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[addDependent](Scriptable.default.md#adddependent)

___

### addItem

▸ **addItem**(`action`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

___

### defaultDataModel

▸ **defaultDataModel**(`name`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`default`

#### Overrides

[default](Scriptable.default.md).[defaultDataModel](Scriptable.default.md#defaultdatamodel)

___

### directReferences

▸ **directReferences**(): `any`

#### Returns

`any`

#### Implementation of

ContainerModel.directReferences

#### Overrides

[default](Scriptable.default.md).[directReferences](Scriptable.default.md#directreferences)

___

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[dispatch](../interfaces/types_Model.ContainerModel.md#dispatch)

#### Overrides

[default](Scriptable.default.md).[dispatch](Scriptable.default.md#dispatch)

___

### executeAction

▸ **executeAction**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[executeAction](Scriptable.default.md#executeaction)

___

### executeAllRules

▸ `Protected` **executeAllRules**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[executeAllRules](Scriptable.default.md#executeallrules)

___

### executeRule

▸ **executeRule**(`event`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[executeRule](Scriptable.default.md#executerule)

___

### getDataNode

▸ **getDataNode**(): `undefined` \| `default`

#### Returns

`undefined` \| `default`

#### Inherited from

[default](Scriptable.default.md).[getDataNode](Scriptable.default.md#getdatanode)

___

### getRuleNode

▸ **getRuleNode**(): `any`

#### Returns

`any`

#### Implementation of

ContainerModel.getRuleNode

#### Inherited from

[default](Scriptable.default.md).[getRuleNode](Scriptable.default.md#getrulenode)

___

### getState

▸ **getState**(): `T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Returns

`T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Overrides

[default](Scriptable.default.md).[getState](Scriptable.default.md#getstate)

___

### importData

▸ **importData**(`contextualDataModel?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel?` | `default` |

#### Returns

`void`

#### Implementation of

ContainerModel.importData

#### Overrides

[default](Scriptable.default.md).[importData](Scriptable.default.md#importdata)

___

### indexOf

▸ **indexOf**(`f`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md) |

#### Returns

`number`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[indexOf](../interfaces/types_Model.ContainerModel.md#indexof)

___

### notifyDependents

▸ **notifyDependents**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[notifyDependents](Scriptable.default.md#notifydependents)

___

### queueEvent

▸ **queueEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Overrides

[default](Scriptable.default.md).[queueEvent](Scriptable.default.md#queueevent)

___

### removeDependent

▸ **removeDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[removeDependent](Scriptable.default.md#removedependent)

___

### removeItem

▸ **removeItem**(`action`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

___

### setupRuleNode

▸ `Protected` **setupRuleNode**(): `void`

#### Returns

`void`

#### Inherited from

[default](Scriptable.default.md).[setupRuleNode](Scriptable.default.md#setuprulenode)

___

### subscribe

▸ **subscribe**(`callback`, `eventName?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callback` | `callbackFn` | `undefined` |
| `eventName` | `string` | `'change'` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[subscribe](../interfaces/types_Model.ContainerModel.md#subscribe)

#### Inherited from

[default](Scriptable.default.md).[subscribe](Scriptable.default.md#subscribe)

___

### syncDataAndFormModel

▸ **syncDataAndFormModel**(`contextualDataModel?`): `void`

prefill the form with data on the given element

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel?` | `default` |

#### Returns

`void`

## Properties

### \_children

• `Protected` **\_children**: ([`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md))[] = `[]`

___

### \_jsonModel

• `Protected` **\_jsonModel**: `T` & { `id`: `string` ; `items`: (`TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  } \| `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/types_Json.md#containerjson) \| [`FieldJson`](../modules/types_Json.md#fieldjson))[]  } & { `id`: `string`  })[]  }

#### Overrides

[default](Scriptable.default.md).[_jsonModel](Scriptable.default.md#_jsonmodel)

___

### \_ruleContext

• `Protected` **\_ruleContext**: `any`

___

### value

• `Abstract` **value**: [`Primitives`](../modules/types_Json.md#primitives)

The current value of the Field. The property is serialized in the Data Model.

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[value](../interfaces/types_Model.ContainerModel.md#value)

#### Inherited from

[default](Scriptable.default.md).[value](Scriptable.default.md#value)

## Constructors

### constructor

• **new default**<`T`\>(`params`, `_options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/types_Json.md#containerjson) \| [`FieldJson`](../modules/types_Json.md#fieldjson))[]  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/types_Model.FormModel.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/types_Model.ContainerModel.md) |

#### Inherited from

[default](Scriptable.default.md).[constructor](Scriptable.default.md#constructor)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[dataRef](../interfaces/types_Model.ContainerModel.md#dataref)

#### Inherited from

Scriptable.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/types_Model.FormModel.md)

#### Returns

[`FormModel`](../interfaces/types_Model.FormModel.md)

#### Inherited from

Scriptable.form

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[id](../interfaces/types_Model.ContainerModel.md#id)

#### Inherited from

Scriptable.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[index](../interfaces/types_Model.ContainerModel.md#index)

#### Inherited from

Scriptable.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[isContainer](../interfaces/types_Model.ContainerModel.md#iscontainer)

#### Overrides

Scriptable.isContainer

___

### items

• `get` **items**(): ([`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md))[]

Array containing Fields or Panels.

#### Returns

([`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md))[]

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[items](../interfaces/types_Model.ContainerModel.md#items)

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/types_Json.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/types_Json.md#label)

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[label](../interfaces/types_Model.ContainerModel.md#label)

#### Inherited from

Scriptable.label

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/types_Json.md#label) |

#### Returns

`void`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[label](../interfaces/types_Model.ContainerModel.md#label)

#### Inherited from

Scriptable.label

___

### maxItems

• `set` **maxItems**(`m`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `number` |

#### Returns

`void`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[maxItems](../interfaces/types_Model.ContainerModel.md#maxitems)

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[name](../interfaces/types_Model.ContainerModel.md#name)

#### Inherited from

Scriptable.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[parent](../interfaces/types_Model.ContainerModel.md#parent)

#### Inherited from

Scriptable.parent

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

ContainerModel.ruleEngine

#### Inherited from

Scriptable.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/types_Json.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/types_Json.md#items)<`string`\>

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[rules](../interfaces/types_Model.ContainerModel.md#rules)

#### Inherited from

Scriptable.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[type](../interfaces/types_Model.ContainerModel.md#type)

#### Inherited from

Scriptable.type

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[viewType](../interfaces/types_Model.ContainerModel.md#viewtype)

#### Inherited from

Scriptable.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[visible](../interfaces/types_Model.ContainerModel.md#visible)

#### Inherited from

Scriptable.visible

• `set` **visible**(`v`): `void`

Whether the field should be visible to author or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[ContainerModel](../interfaces/types_Model.ContainerModel.md).[visible](../interfaces/types_Model.ContainerModel.md#visible)

#### Inherited from

Scriptable.visible
