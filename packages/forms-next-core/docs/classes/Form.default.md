# Class: default

[Form](../modules/Form.md).default

Defines `form model` which implements [form model](../modules/FormModel.md)

## Hierarchy

- [`default`](Container.default.md)<[`FormJson`](../modules/FormJsonTypes.md#formjson)\>

  ↳ **`default`**

## Implements

- [`FormModel`](../interfaces/FormModel.FormModel-1.md)

## Table of contents

### Properties

- [\_fields](Form.default.md#_fields)
- [\_ids](Form.default.md#_ids)
- [\_invalidFields](Form.default.md#_invalidfields)

### Methods

- [\_initialize](Form.default.md#_initialize)
- [\_setProperty](Form.default.md#_setproperty)
- [addDependent](Form.default.md#adddependent)
- [addItem](Form.default.md#additem)
- [defaultDataModel](Form.default.md#defaultdatamodel)
- [directReferences](Form.default.md#directreferences)
- [exportData](Form.default.md#exportdata)
- [getElement](Form.default.md#getelement)
- [getState](Form.default.md#getstate)
- [getUniqueId](Form.default.md#getuniqueid)
- [importData](Form.default.md#importdata)
- [indexOf](Form.default.md#indexof)
- [isValid](Form.default.md#isvalid)
- [queueEvent](Form.default.md#queueevent)
- [removeDependent](Form.default.md#removedependent)
- [removeItem](Form.default.md#removeitem)
- [subscribe](Form.default.md#subscribe)

### Accessors

- [action](Form.default.md#action)
- [dataRef](Form.default.md#dataref)
- [form](Form.default.md#form)
- [id](Form.default.md#id)
- [index](Form.default.md#index)
- [isContainer](Form.default.md#iscontainer)
- [items](Form.default.md#items)
- [label](Form.default.md#label)
- [maxItems](Form.default.md#maxitems)
- [metaData](Form.default.md#metadata)
- [name](Form.default.md#name)
- [parent](Form.default.md#parent)
- [ruleEngine](Form.default.md#ruleengine)
- [rules](Form.default.md#rules)
- [title](Form.default.md#title)
- [type](Form.default.md#type)
- [value](Form.default.md#value)
- [viewType](Form.default.md#viewtype)
- [visible](Form.default.md#visible)

## Properties

### \_fields

• **\_fields**: [`Items`](../modules/FormJsonTypes.md#items)<[`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md)\> = `{}`

___

### \_ids

• **\_ids**: `Generator`<`string`, `void`, `string`\>

___

### \_invalidFields

• **\_invalidFields**: `string`[] = `[]`

## Methods

### \_initialize

▸ **_initialize**(): `void`

private

#### Returns

`void`

#### Implementation of

FormModel.\_initialize

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

private

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

private

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

private

#### Returns

`any`

#### Implementation of

FormModel.directReferences

#### Inherited from

[default](Container.default.md).[directReferences](Container.default.md#directreferences)

___

### exportData

▸ **exportData**(): `any`

Exports the form data

#### Returns

`any`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[exportData](../interfaces/FormModel.FormModel-1.md#exportdata)

___

### getElement

▸ **getElement**(`id`): [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md) \| [`default`](Form.default.md)

Get form element model based on the id of the form element

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md) \| [`default`](Form.default.md)

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[getElement](../interfaces/FormModel.FormModel-1.md#getelement)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/FormJsonTypes.md#containerjson) \| [`FieldJson`](../modules/FormJsonTypes.md#fieldjson))[]  } & { `action?`: `string` ; `data?`: `any` ; `metadata?`: [`MetaDataJson`](../modules/FormJsonTypes.md#metadatajson) ; `title?`: `string`  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

Returns the current state of the form

To access the form data and attachments, one needs to use the `data` and `attachments` property.
For example,
```
const data = form.getState().data
const attachments = form.getState().attachments
```

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/FormJsonTypes.md#containerjson) \| [`FieldJson`](../modules/FormJsonTypes.md#fieldjson))[]  } & { `action?`: `string` ; `data?`: `any` ; `metadata?`: [`MetaDataJson`](../modules/FormJsonTypes.md#metadatajson) ; `title?`: `string`  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[getState](../interfaces/FormModel.FormModel-1.md#getstate)

#### Overrides

[default](Container.default.md).[getState](Container.default.md#getstate)

___

### getUniqueId

▸ **getUniqueId**(): `string`

#### Returns

`string`

#### Implementation of

FormModel.getUniqueId

___

### importData

▸ **importData**(`dataModel`): `void`

Imports the given form data

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataModel` | `any` |

#### Returns

`void`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[importData](../interfaces/FormModel.FormModel-1.md#importdata)

#### Overrides

[default](Container.default.md).[importData](Container.default.md#importdata)

___

### indexOf

▸ **indexOf**(`f`): `number`

Returns the index of the [child item](../interfaces/FormModel.FieldModel.md) or the [child container](../interfaces/FormModel.FieldsetModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md) |

#### Returns

`number`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[indexOf](../interfaces/FormModel.FormModel-1.md#indexof)

#### Inherited from

[default](Container.default.md).[indexOf](Container.default.md#indexof)

___

### isValid

▸ **isValid**(): `boolean`

Checks if the given form is valid or not

#### Returns

`boolean`

`true`, if form is valid, `false` otherwise

___

### queueEvent

▸ **queueEvent**(`action`): `void`

private

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

private

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

FormModel.subscribe

#### Inherited from

[default](Container.default.md).[subscribe](Container.default.md#subscribe)

## Accessors

### action

• `get` **action**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[dataRef](../interfaces/FormModel.FormModel-1.md#dataref)

#### Inherited from

Container.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Overrides

Container.form

___

### id

• `get` **id**(): `string`

Id of the form.

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[id](../interfaces/FormModel.FormModel-1.md#id)

#### Overrides

Container.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[index](../interfaces/FormModel.FormModel-1.md#index)

#### Inherited from

Container.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[isContainer](../interfaces/FormModel.FormModel-1.md#iscontainer)

#### Inherited from

Container.isContainer

___

### items

• `get` **items**(): ([`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md))[]

Defines the children/items of the container

#### Returns

([`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md))[]

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[items](../interfaces/FormModel.FormModel-1.md#items)

#### Inherited from

Container.items

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[label](../interfaces/FormModel.FormModel-1.md#label)

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

[FormModel](../interfaces/FormModel.FormModel-1.md).[label](../interfaces/FormModel.FormModel-1.md#label)

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

[FormModel](../interfaces/FormModel.FormModel-1.md).[maxItems](../interfaces/FormModel.FormModel-1.md#maxitems)

#### Inherited from

Container.maxItems

___

### metaData

• `get` **metaData**(): [`default`](FormMetaData.default.md)

#### Returns

[`default`](FormMetaData.default.md)

___

### name

• `get` **name**(): `string`

Name of the form field.

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[name](../interfaces/FormModel.FormModel-1.md#name)

#### Overrides

Container.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

Defines the parent of the container

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[parent](../interfaces/FormModel.FormModel-1.md#parent)

#### Inherited from

Container.parent

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

FormModel.ruleEngine

#### Overrides

Container.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/FormJsonTypes.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[rules](../interfaces/FormModel.FormModel-1.md#rules)

#### Inherited from

Container.rules

___

### title

• `get` **title**(): `string`

Form title.

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[title](../interfaces/FormModel.FormModel-1.md#title)

___

### type

• `get` **type**(): `string`

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[type](../interfaces/FormModel.FormModel-1.md#type)

#### Overrides

Container.type

___

### value

• `get` **value**(): ``null``

The current value of the Field. The property is serialized in the Data Model.

#### Returns

``null``

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[value](../interfaces/FormModel.FormModel-1.md#value)

#### Overrides

Container.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[viewType](../interfaces/FormModel.FormModel-1.md#viewtype)

#### Inherited from

Container.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FormModel](../interfaces/FormModel.FormModel-1.md).[visible](../interfaces/FormModel.FormModel-1.md#visible)

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

[FormModel](../interfaces/FormModel.FormModel-1.md).[visible](../interfaces/FormModel.FormModel-1.md#visible)

#### Inherited from

Container.visible
