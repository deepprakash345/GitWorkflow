# Class: default<T\>

[Container](../modules/Container.md).default

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ContainerJson`](../modules/FormJsonTypes.md#containerjson) & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) |

## Hierarchy

- [`default`](Scriptable.default.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`Fieldset`](Fieldset.Fieldset-1.md)

  ↳↳ [`default`](Form.default.md)

## Implements

- [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

## Table of contents

### Methods

- [\_bindToDataModel](Container.default.md#_bindtodatamodel)
- [\_initialize](Container.default.md#_initialize)
- [\_setProperty](Container.default.md#_setproperty)
- [addDependent](Container.default.md#adddependent)
- [addItem](Container.default.md#additem)
- [defaultDataModel](Container.default.md#defaultdatamodel)
- [directReferences](Container.default.md#directreferences)
- [dispatch](Container.default.md#dispatch)
- [executeAction](Container.default.md#executeaction)
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
- [subscribe](Container.default.md#subscribe)
- [syncDataAndFormModel](Container.default.md#syncdataandformmodel)

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

### Properties

- [value](Container.default.md#value)

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
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

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
| `action` | [`Action`](../interfaces/FormModel.Action.md) |
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
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[dispatch](../interfaces/FormModel.ContainerModel.md#dispatch)

#### Overrides

[default](Scriptable.default.md).[dispatch](Scriptable.default.md#dispatch)

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

[default](Scriptable.default.md).[executeAction](Scriptable.default.md#executeaction)

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
| `f` | [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md) |

#### Returns

`number`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[indexOf](../interfaces/FormModel.ContainerModel.md#indexof)

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

[default](Scriptable.default.md).[notifyDependents](Scriptable.default.md#notifydependents)

___

### queueEvent

▸ **queueEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

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
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

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
| `action` | [`Action`](../interfaces/FormModel.Action.md) |
| `context` | `any` |

#### Returns

`void`

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

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[subscribe](../interfaces/FormModel.ContainerModel.md#subscribe)

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

## Constructors

### constructor

• **new default**<`T`\>(`params`, `_options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/FormJsonTypes.md#containerjson) \| [`FieldJson`](../modules/FormJsonTypes.md#fieldjson))[]  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/FormModel.FormModel-1.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/FormModel.ContainerModel.md) |

#### Inherited from

[default](Scriptable.default.md).[constructor](Scriptable.default.md#constructor)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[dataRef](../interfaces/FormModel.ContainerModel.md#dataref)

#### Inherited from

Scriptable.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Inherited from

Scriptable.form

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[id](../interfaces/FormModel.ContainerModel.md#id)

#### Inherited from

Scriptable.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[index](../interfaces/FormModel.ContainerModel.md#index)

#### Inherited from

Scriptable.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[isContainer](../interfaces/FormModel.ContainerModel.md#iscontainer)

#### Overrides

Scriptable.isContainer

___

### items

• `get` **items**(): ([`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md))[]

Array containing Fields or Panels.

#### Returns

([`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md))[]

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[items](../interfaces/FormModel.ContainerModel.md#items)

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[label](../interfaces/FormModel.ContainerModel.md#label)

#### Inherited from

Scriptable.label

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/FormJsonTypes.md#label) |

#### Returns

`void`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[label](../interfaces/FormModel.ContainerModel.md#label)

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

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[maxItems](../interfaces/FormModel.ContainerModel.md#maxitems)

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[name](../interfaces/FormModel.ContainerModel.md#name)

#### Inherited from

Scriptable.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[parent](../interfaces/FormModel.ContainerModel.md#parent)

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

• `get` **rules**(): [`Items`](../modules/FormJsonTypes.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[rules](../interfaces/FormModel.ContainerModel.md#rules)

#### Inherited from

Scriptable.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[type](../interfaces/FormModel.ContainerModel.md#type)

#### Inherited from

Scriptable.type

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[viewType](../interfaces/FormModel.ContainerModel.md#viewtype)

#### Inherited from

Scriptable.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[visible](../interfaces/FormModel.ContainerModel.md#visible)

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

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[visible](../interfaces/FormModel.ContainerModel.md#visible)

#### Inherited from

Scriptable.visible

## Properties

### value

• `Abstract` **value**: [`Primitives`](../modules/FormJsonTypes.md#primitives)

The current value of the Field. The property is serialized in the Data Model.

#### Implementation of

[ContainerModel](../interfaces/FormModel.ContainerModel.md).[value](../interfaces/FormModel.ContainerModel.md#value)

#### Inherited from

[default](Scriptable.default.md).[value](Scriptable.default.md#value)
