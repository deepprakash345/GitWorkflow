# Class: Fieldset

[Fieldset](../modules/Fieldset.md).Fieldset

## Hierarchy

- [`default`](Container.default.md)<[`FieldsetJson`](../modules/FormJsonTypes.md#fieldsetjson)\>

  ↳ **`Fieldset`**

## Implements

- [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md)

## Table of contents

### Methods

- [\_bindToDataModel](Fieldset.Fieldset-1.md#_bindtodatamodel)
- [\_initialize](Fieldset.Fieldset-1.md#_initialize)
- [\_setProperty](Fieldset.Fieldset-1.md#_setproperty)
- [addDependent](Fieldset.Fieldset-1.md#adddependent)
- [addItem](Fieldset.Fieldset-1.md#additem)
- [defaultDataModel](Fieldset.Fieldset-1.md#defaultdatamodel)
- [directReferences](Fieldset.Fieldset-1.md#directreferences)
- [dispatch](Fieldset.Fieldset-1.md#dispatch)
- [executeAction](Fieldset.Fieldset-1.md#executeaction)
- [executeRule](Fieldset.Fieldset-1.md#executerule)
- [getDataNode](Fieldset.Fieldset-1.md#getdatanode)
- [getRuleNode](Fieldset.Fieldset-1.md#getrulenode)
- [getState](Fieldset.Fieldset-1.md#getstate)
- [importData](Fieldset.Fieldset-1.md#importdata)
- [indexOf](Fieldset.Fieldset-1.md#indexof)
- [notifyDependents](Fieldset.Fieldset-1.md#notifydependents)
- [queueEvent](Fieldset.Fieldset-1.md#queueevent)
- [removeDependent](Fieldset.Fieldset-1.md#removedependent)
- [removeItem](Fieldset.Fieldset-1.md#removeitem)
- [subscribe](Fieldset.Fieldset-1.md#subscribe)
- [syncDataAndFormModel](Fieldset.Fieldset-1.md#syncdataandformmodel)

### Constructors

- [constructor](Fieldset.Fieldset-1.md#constructor)

### Accessors

- [dataRef](Fieldset.Fieldset-1.md#dataref)
- [form](Fieldset.Fieldset-1.md#form)
- [id](Fieldset.Fieldset-1.md#id)
- [index](Fieldset.Fieldset-1.md#index)
- [isContainer](Fieldset.Fieldset-1.md#iscontainer)
- [items](Fieldset.Fieldset-1.md#items)
- [label](Fieldset.Fieldset-1.md#label)
- [maxItems](Fieldset.Fieldset-1.md#maxitems)
- [name](Fieldset.Fieldset-1.md#name)
- [parent](Fieldset.Fieldset-1.md#parent)
- [ruleEngine](Fieldset.Fieldset-1.md#ruleengine)
- [rules](Fieldset.Fieldset-1.md#rules)
- [type](Fieldset.Fieldset-1.md#type)
- [value](Fieldset.Fieldset-1.md#value)
- [viewType](Fieldset.Fieldset-1.md#viewtype)
- [visible](Fieldset.Fieldset-1.md#visible)

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

[default](Container.default.md).[_bindToDataModel](Container.default.md#_bindtodatamodel)

___

### \_initialize

▸ **_initialize**(): `void`

#### Returns

`void`

#### Implementation of

FieldsetModel.\_initialize

#### Inherited from

[default](Container.default.md).[_initialize](Container.default.md#_initialize)

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

[default](Container.default.md).[_setProperty](Container.default.md#_setproperty)

___

### addDependent

▸ **addDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[addDependent](Container.default.md#adddependent)

___

### addItem

▸ **addItem**(`action`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[addItem](Container.default.md#additem)

___

### defaultDataModel

▸ **defaultDataModel**(`name`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`default`

#### Inherited from

[default](Container.default.md).[defaultDataModel](Container.default.md#defaultdatamodel)

___

### directReferences

▸ **directReferences**(): `any`

#### Returns

`any`

#### Implementation of

FieldsetModel.directReferences

#### Inherited from

[default](Container.default.md).[directReferences](Container.default.md#directreferences)

___

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[dispatch](../interfaces/FormModel.FieldsetModel.md#dispatch)

#### Inherited from

[default](Container.default.md).[dispatch](Container.default.md#dispatch)

___

### executeAction

▸ **executeAction**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[executeAction](Container.default.md#executeaction)

___

### executeRule

▸ **executeRule**(`event`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Action`](../interfaces/FormModel.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[executeRule](Container.default.md#executerule)

___

### getDataNode

▸ **getDataNode**(): `undefined` \| `default`

#### Returns

`undefined` \| `default`

#### Inherited from

[default](Container.default.md).[getDataNode](Container.default.md#getdatanode)

___

### getRuleNode

▸ **getRuleNode**(): `any`

#### Returns

`any`

#### Implementation of

FieldsetModel.getRuleNode

#### Inherited from

[default](Container.default.md).[getRuleNode](Container.default.md#getrulenode)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/FormJsonTypes.md#containerjson) \| [`FieldJson`](../modules/FormJsonTypes.md#fieldjson))[]  } & { `type?`: ``"object"`` \| ``"array"``  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/FormJsonTypes.md#containerjson) \| [`FieldJson`](../modules/FormJsonTypes.md#fieldjson))[]  } & { `type?`: ``"object"`` \| ``"array"``  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[getState](../interfaces/FormModel.FieldsetModel.md#getstate)

#### Inherited from

[default](Container.default.md).[getState](Container.default.md#getstate)

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

FieldsetModel.importData

#### Inherited from

[default](Container.default.md).[importData](Container.default.md#importdata)

___

### indexOf

▸ **indexOf**(`f`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md) |

#### Returns

`number`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[indexOf](../interfaces/FormModel.FieldsetModel.md#indexof)

#### Inherited from

[default](Container.default.md).[indexOf](Container.default.md#indexof)

___

### notifyDependents

▸ **notifyDependents**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[notifyDependents](Container.default.md#notifydependents)

___

### queueEvent

▸ **queueEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[queueEvent](Container.default.md#queueevent)

___

### removeDependent

▸ **removeDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[removeDependent](Container.default.md#removedependent)

___

### removeItem

▸ **removeItem**(`action`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[removeItem](Container.default.md#removeitem)

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

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[subscribe](../interfaces/FormModel.FieldsetModel.md#subscribe)

#### Inherited from

[default](Container.default.md).[subscribe](Container.default.md#subscribe)

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

#### Inherited from

[default](Container.default.md).[syncDataAndFormModel](Container.default.md#syncdataandformmodel)

## Constructors

### constructor

• **new Fieldset**(`params`, `_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FieldsetJson`](../modules/FormJsonTypes.md#fieldsetjson) |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/FormModel.FormModel-1.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/FormModel.ContainerModel.md) |

#### Overrides

[default](Container.default.md).[constructor](Container.default.md#constructor)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[dataRef](../interfaces/FormModel.FieldsetModel.md#dataref)

#### Inherited from

Container.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Inherited from

Container.form

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[id](../interfaces/FormModel.FieldsetModel.md#id)

#### Inherited from

Container.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[index](../interfaces/FormModel.FieldsetModel.md#index)

#### Inherited from

Container.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[isContainer](../interfaces/FormModel.FieldsetModel.md#iscontainer)

#### Inherited from

Container.isContainer

___

### items

• `get` **items**(): ([`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md))[]

Array containing Fields or Panels.

#### Returns

([`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md))[]

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[items](../interfaces/FormModel.FieldsetModel.md#items)

#### Overrides

Container.items

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[label](../interfaces/FormModel.FieldsetModel.md#label)

#### Inherited from

Container.label

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/FormJsonTypes.md#label) |

#### Returns

`void`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[label](../interfaces/FormModel.FieldsetModel.md#label)

#### Inherited from

Container.label

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

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[maxItems](../interfaces/FormModel.FieldsetModel.md#maxitems)

#### Inherited from

Container.maxItems

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[name](../interfaces/FormModel.FieldsetModel.md#name)

#### Inherited from

Container.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[parent](../interfaces/FormModel.FieldsetModel.md#parent)

#### Inherited from

Container.parent

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

FieldsetModel.ruleEngine

#### Inherited from

Container.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/FormJsonTypes.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[rules](../interfaces/FormModel.FieldsetModel.md#rules)

#### Inherited from

Container.rules

___

### type

• `get` **type**(): `undefined` \| ``"array"`` \| ``"object"``

#### Returns

`undefined` \| ``"array"`` \| ``"object"``

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[type](../interfaces/FormModel.FieldsetModel.md#type)

#### Overrides

Container.type

___

### value

• `get` **value**(): ``null``

The current value of the Field. The property is serialized in the Data Model.

#### Returns

``null``

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[value](../interfaces/FormModel.FieldsetModel.md#value)

#### Overrides

Container.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[viewType](../interfaces/FormModel.FieldsetModel.md#viewtype)

#### Inherited from

Container.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[visible](../interfaces/FormModel.FieldsetModel.md#visible)

#### Inherited from

Container.visible

• `set` **visible**(`v`): `void`

Whether the field should be visible to author or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldsetModel](../interfaces/FormModel.FieldsetModel.md).[visible](../interfaces/FormModel.FieldsetModel.md#visible)

#### Inherited from

Container.visible
