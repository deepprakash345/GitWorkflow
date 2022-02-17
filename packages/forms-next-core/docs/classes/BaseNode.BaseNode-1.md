# Class: BaseNode<T\>

[BaseNode](../modules/BaseNode.md).BaseNode

Defines a generic base class which all objects of form runtime model should extend from.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`BaseJson`](../modules/FormJsonTypes.md#basejson) | type of the form object which extends from [base type](../modules/FormJsonTypes.md#basejson) |

## Hierarchy

- **`BaseNode`**

  ↳ [`default`](Scriptable.default.md)

## Implements

- [`BaseModel`](../interfaces/FormModel.BaseModel.md)

## Table of contents

### Methods

- [addDependent](BaseNode.BaseNode-1.md#adddependent)
- [defaultDataModel](BaseNode.BaseNode-1.md#defaultdatamodel)
- [dispatch](BaseNode.BaseNode-1.md#dispatch)
- [executeAction](BaseNode.BaseNode-1.md#executeaction)
- [getState](BaseNode.BaseNode-1.md#getstate)
- [importData](BaseNode.BaseNode-1.md#importdata)
- [removeDependent](BaseNode.BaseNode-1.md#removedependent)
- [subscribe](BaseNode.BaseNode-1.md#subscribe)

### Constructors

- [constructor](BaseNode.BaseNode-1.md#constructor)

### Accessors

- [dataRef](BaseNode.BaseNode-1.md#dataref)
- [form](BaseNode.BaseNode-1.md#form)
- [id](BaseNode.BaseNode-1.md#id)
- [index](BaseNode.BaseNode-1.md#index)
- [isContainer](BaseNode.BaseNode-1.md#iscontainer)
- [label](BaseNode.BaseNode-1.md#label)
- [name](BaseNode.BaseNode-1.md#name)
- [parent](BaseNode.BaseNode-1.md#parent)
- [ruleEngine](BaseNode.BaseNode-1.md#ruleengine)
- [type](BaseNode.BaseNode-1.md#type)
- [viewType](BaseNode.BaseNode-1.md#viewtype)
- [visible](BaseNode.BaseNode-1.md#visible)

### Properties

- [value](BaseNode.BaseNode-1.md#value)

## Methods

### addDependent

▸ **addDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

___

### defaultDataModel

▸ `Abstract` **defaultDataModel**(`name`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`default`

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

BaseModel.dispatch

___

### executeAction

▸ `Abstract` **executeAction**(`action`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`any`

___

### getState

▸ **getState**(): `T` & { `id`: `string`  }

#### Returns

`T` & { `id`: `string`  }

___

### importData

▸ `Abstract` **importData**(`a`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `default` |

#### Returns

`any`

#### Implementation of

BaseModel.importData

___

### removeDependent

▸ **removeDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

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

BaseModel.subscribe

## Constructors

### constructor

• **new BaseNode**<`T`\>(`params`, `_options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`BaseJson`](../modules/FormJsonTypes.md#basejson) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/FormModel.FormModel-1.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/FormModel.ContainerModel.md) |

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[dataRef](../interfaces/FormModel.BaseModel.md#dataref)

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[id](../interfaces/FormModel.BaseModel.md#id)

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[index](../interfaces/FormModel.BaseModel.md#index)

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[isContainer](../interfaces/FormModel.BaseModel.md#iscontainer)

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[label](../interfaces/FormModel.BaseModel.md#label)

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/FormJsonTypes.md#label) |

#### Returns

`void`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[label](../interfaces/FormModel.BaseModel.md#label)

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[name](../interfaces/FormModel.BaseModel.md#name)

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[parent](../interfaces/FormModel.BaseModel.md#parent)

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[type](../interfaces/FormModel.BaseModel.md#type)

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[viewType](../interfaces/FormModel.BaseModel.md#viewtype)

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[visible](../interfaces/FormModel.BaseModel.md#visible)

• `set` **visible**(`v`): `void`

Whether the field should be visible to author or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[visible](../interfaces/FormModel.BaseModel.md#visible)

## Properties

### value

• `Abstract` **value**: [`Primitives`](../modules/FormJsonTypes.md#primitives)

The current value of the Field. The property is serialized in the Data Model.

#### Implementation of

[BaseModel](../interfaces/FormModel.BaseModel.md).[value](../interfaces/FormModel.BaseModel.md#value)
