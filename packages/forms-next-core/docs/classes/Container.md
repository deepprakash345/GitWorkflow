# Class: Container<T\>

Defines a generic container class which any form container should extend from.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`ContainerJson`](../README.md#containerjson) & [`RulesJson`](../README.md#rulesjson) | type of the node which extends [ContainerJson](../README.md#containerjson) and [RulesJson](../README.md#rulesjson) |

## Hierarchy

- [`Scriptable`](Scriptable.md)<`T`\>

  ↳ **`Container`**

  ↳↳ [`Form`](Form.md)

  ↳↳ [`Fieldset`](Fieldset.md)

## Implements

- [`ContainerModel`](../interfaces/ContainerModel.md)

## Table of contents

### Accessors

- [dataRef](Container.md#dataref)
- [form](Container.md#form)
- [id](Container.md#id)
- [index](Container.md#index)
- [isContainer](Container.md#iscontainer)
- [items](Container.md#items)
- [label](Container.md#label)
- [maxItems](Container.md#maxitems)
- [name](Container.md#name)
- [parent](Container.md#parent)
- [ruleEngine](Container.md#ruleengine)
- [rules](Container.md#rules)
- [type](Container.md#type)
- [viewType](Container.md#viewtype)
- [visible](Container.md#visible)

### Methods

- [executeAction](Container.md#executeaction)
- [getState](Container.md#getstate)
- [indexOf](Container.md#indexof)

### Properties

- [value](Container.md#value)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[dataRef](../interfaces/ContainerModel.md#dataref)

#### Inherited from

Scriptable.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.md)

#### Returns

[`FormModel`](../interfaces/FormModel.md)

#### Inherited from

Scriptable.form

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[id](../interfaces/ContainerModel.md#id)

#### Inherited from

Scriptable.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[index](../interfaces/ContainerModel.md#index)

#### Inherited from

Scriptable.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[isContainer](../interfaces/ContainerModel.md#iscontainer)

#### Overrides

Scriptable.isContainer

___

### items

• `get` **items**(): ([`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md))[]

Defines the children/items of the container

#### Returns

([`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md))[]

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[items](../interfaces/ContainerModel.md#items)

___

### label

• `get` **label**(): `undefined` \| [`Label`](../README.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../README.md#label)

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[label](../interfaces/ContainerModel.md#label)

#### Inherited from

Scriptable.label

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../README.md#label) |

#### Returns

`void`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[label](../interfaces/ContainerModel.md#label)

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

[ContainerModel](../interfaces/ContainerModel.md).[maxItems](../interfaces/ContainerModel.md#maxitems)

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[name](../interfaces/ContainerModel.md#name)

#### Inherited from

Scriptable.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/ContainerModel.md)

Defines the parent of the container

#### Returns

[`ContainerModel`](../interfaces/ContainerModel.md)

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[parent](../interfaces/ContainerModel.md#parent)

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

• `get` **rules**(): [`Items`](../README.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../README.md#items)<`string`\>

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[rules](../interfaces/ContainerModel.md#rules)

#### Inherited from

Scriptable.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[type](../interfaces/ContainerModel.md#type)

#### Inherited from

Scriptable.type

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[viewType](../interfaces/ContainerModel.md#viewtype)

#### Inherited from

Scriptable.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[visible](../interfaces/ContainerModel.md#visible)

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

[ContainerModel](../interfaces/ContainerModel.md).[visible](../interfaces/ContainerModel.md#visible)

#### Inherited from

Scriptable.visible

## Methods

### executeAction

▸ **executeAction**(`action`): `void`

Executes the given action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`Action`](../interfaces/Action.md) | [event object](../interfaces/Action.md) |

#### Returns

`void`

#### Inherited from

[Scriptable](Scriptable.md).[executeAction](Scriptable.md#executeaction)

___

### getState

▸ **getState**(): `T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

Returns the current container state

#### Returns

`T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Overrides

[Scriptable](Scriptable.md).[getState](Scriptable.md#getstate)

___

### indexOf

▸ **indexOf**(`f`): `number`

Returns the index of the [child item](../interfaces/FieldModel.md) or the [child container](../interfaces/FieldsetModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md) |

#### Returns

`number`

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[indexOf](../interfaces/ContainerModel.md#indexof)

## Properties

### value

• `Abstract` **value**: [`Primitives`](../README.md#primitives)

The current value of the Field. The property is serialized in the Data Model.

#### Implementation of

[ContainerModel](../interfaces/ContainerModel.md).[value](../interfaces/ContainerModel.md#value)

#### Inherited from

[Scriptable](Scriptable.md).[value](Scriptable.md#value)
