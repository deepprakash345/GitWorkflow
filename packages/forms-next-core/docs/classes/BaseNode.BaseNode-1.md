# Class: BaseNode<T\>

[BaseNode](../modules/BaseNode.md).BaseNode

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`BaseJson`](../modules/types_Json.md#basejson) |

## Hierarchy

- **`BaseNode`**

  ↳ [`default`](Scriptable.default.md)

## Implements

- [`BaseModel`](../interfaces/types_Model.BaseModel.md)

## Table of contents

### Methods

- [\_bindToDataModel](BaseNode.BaseNode-1.md#_bindtodatamodel)
- [addDependent](BaseNode.BaseNode-1.md#adddependent)
- [defaultDataModel](BaseNode.BaseNode-1.md#defaultdatamodel)
- [directReferences](BaseNode.BaseNode-1.md#directreferences)
- [dispatch](BaseNode.BaseNode-1.md#dispatch)
- [executeAction](BaseNode.BaseNode-1.md#executeaction)
- [getDataNode](BaseNode.BaseNode-1.md#getdatanode)
- [getRuleNode](BaseNode.BaseNode-1.md#getrulenode)
- [getState](BaseNode.BaseNode-1.md#getstate)
- [importData](BaseNode.BaseNode-1.md#importdata)
- [notifyDependents](BaseNode.BaseNode-1.md#notifydependents)
- [queueEvent](BaseNode.BaseNode-1.md#queueevent)
- [removeDependent](BaseNode.BaseNode-1.md#removedependent)
- [setupRuleNode](BaseNode.BaseNode-1.md#setuprulenode)
- [subscribe](BaseNode.BaseNode-1.md#subscribe)

### Properties

- [\_jsonModel](BaseNode.BaseNode-1.md#_jsonmodel)
- [value](BaseNode.BaseNode-1.md#value)

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

## Methods

### \_bindToDataModel

▸ **_bindToDataModel**(`contextualDataModel?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel?` | `default` |

#### Returns

`void`

___

### addDependent

▸ **addDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

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

### directReferences

▸ **directReferences**(): [`BaseNode`](BaseNode.BaseNode-1.md)<`T`\>

#### Returns

[`BaseNode`](BaseNode.BaseNode-1.md)<`T`\>

#### Implementation of

BaseModel.directReferences

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

[BaseModel](../interfaces/types_Model.BaseModel.md).[dispatch](../interfaces/types_Model.BaseModel.md#dispatch)

___

### executeAction

▸ `Abstract` **executeAction**(`action`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`any`

___

### getDataNode

▸ **getDataNode**(): `undefined` \| `default`

#### Returns

`undefined` \| `default`

___

### getRuleNode

▸ **getRuleNode**(): `any`

#### Returns

`any`

#### Implementation of

BaseModel.getRuleNode

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

### notifyDependents

▸ **notifyDependents**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

___

### queueEvent

▸ **queueEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

___

### removeDependent

▸ **removeDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

___

### setupRuleNode

▸ `Protected` **setupRuleNode**(): `void`

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

[BaseModel](../interfaces/types_Model.BaseModel.md).[subscribe](../interfaces/types_Model.BaseModel.md#subscribe)

## Properties

### \_jsonModel

• `Protected` **\_jsonModel**: `T` & { `id`: `string`  }

___

### value

• `Abstract` **value**: [`Primitives`](../modules/types_Json.md#primitives)

The current value of the Field. The property is serialized in the Data Model.

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[value](../interfaces/types_Model.BaseModel.md#value)

## Constructors

### constructor

• **new BaseNode**<`T`\>(`params`, `_options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`BaseJson`](../modules/types_Json.md#basejson) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/types_Model.FormModel.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/types_Model.ContainerModel.md) |

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[dataRef](../interfaces/types_Model.BaseModel.md#dataref)

___

### form

• `get` **form**(): [`FormModel`](../interfaces/types_Model.FormModel.md)

#### Returns

[`FormModel`](../interfaces/types_Model.FormModel.md)

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[id](../interfaces/types_Model.BaseModel.md#id)

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[index](../interfaces/types_Model.BaseModel.md#index)

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[isContainer](../interfaces/types_Model.BaseModel.md#iscontainer)

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/types_Json.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/types_Json.md#label)

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[label](../interfaces/types_Model.BaseModel.md#label)

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/types_Json.md#label) |

#### Returns

`void`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[label](../interfaces/types_Model.BaseModel.md#label)

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[name](../interfaces/types_Model.BaseModel.md#name)

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[parent](../interfaces/types_Model.BaseModel.md#parent)

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

[BaseModel](../interfaces/types_Model.BaseModel.md).[type](../interfaces/types_Model.BaseModel.md#type)

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[viewType](../interfaces/types_Model.BaseModel.md#viewtype)

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[visible](../interfaces/types_Model.BaseModel.md#visible)

• `set` **visible**(`v`): `void`

Whether the field should be visible to author or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[BaseModel](../interfaces/types_Model.BaseModel.md).[visible](../interfaces/types_Model.BaseModel.md#visible)
