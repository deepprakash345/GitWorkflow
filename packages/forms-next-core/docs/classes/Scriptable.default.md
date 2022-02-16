# Class: default<T\>

[Scriptable](../modules/Scriptable.md).default

Defines scriptable aspects (ie rules, events) of form runtime model. Any form runtime object which requires
execution of rules/events should extend from this class.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) |

## Hierarchy

- [`BaseNode`](BaseNode.BaseNode-1.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`default`](Container.default.md)

  ↳↳ [`default`](Field.default.md)

## Implements

- [`ScriptableField`](../interfaces/FormModel.ScriptableField.md)

## Table of contents

### Methods

- [\_setProperty](Scriptable.default.md#_setproperty)
- [addDependent](Scriptable.default.md#adddependent)
- [defaultDataModel](Scriptable.default.md#defaultdatamodel)
- [dispatch](Scriptable.default.md#dispatch)
- [executeAction](Scriptable.default.md#executeaction)
- [getState](Scriptable.default.md#getstate)
- [importData](Scriptable.default.md#importdata)
- [removeDependent](Scriptable.default.md#removedependent)
- [subscribe](Scriptable.default.md#subscribe)

### Constructors

- [constructor](Scriptable.default.md#constructor)

### Accessors

- [dataRef](Scriptable.default.md#dataref)
- [form](Scriptable.default.md#form)
- [id](Scriptable.default.md#id)
- [index](Scriptable.default.md#index)
- [isContainer](Scriptable.default.md#iscontainer)
- [label](Scriptable.default.md#label)
- [name](Scriptable.default.md#name)
- [parent](Scriptable.default.md#parent)
- [ruleEngine](Scriptable.default.md#ruleengine)
- [rules](Scriptable.default.md#rules)
- [type](Scriptable.default.md#type)
- [viewType](Scriptable.default.md#viewtype)
- [visible](Scriptable.default.md#visible)

### Properties

- [value](Scriptable.default.md#value)

## Methods

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

[BaseNode](BaseNode.BaseNode-1.md).[addDependent](BaseNode.BaseNode-1.md#adddependent)

___

### defaultDataModel

▸ `Abstract` **defaultDataModel**(`name`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`default`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[defaultDataModel](BaseNode.BaseNode-1.md#defaultdatamodel)

___

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[dispatch](BaseNode.BaseNode-1.md#dispatch)

___

### executeAction

▸ **executeAction**(`action`): `void`

Executes the given action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) | [event object](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Overrides

[BaseNode](BaseNode.BaseNode-1.md).[executeAction](BaseNode.BaseNode-1.md#executeaction)

___

### getState

▸ **getState**(): `T` & { `id`: `string`  }

#### Returns

`T` & { `id`: `string`  }

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[getState](BaseNode.BaseNode-1.md#getstate)

___

### importData

▸ `Abstract` **importData**(`a`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `default` |

#### Returns

`any`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[importData](BaseNode.BaseNode-1.md#importdata)

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

[BaseNode](BaseNode.BaseNode-1.md).[removeDependent](BaseNode.BaseNode-1.md#removedependent)

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

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[subscribe](BaseNode.BaseNode-1.md#subscribe)

## Constructors

### constructor

• **new default**<`T`\>(`params`, `_options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/FormModel.FormModel-1.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/FormModel.ContainerModel.md) |

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[constructor](BaseNode.BaseNode-1.md#constructor)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

#### Returns

`undefined` \| ``null`` \| `string`

#### Inherited from

BaseNode.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Inherited from

BaseNode.form

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

BaseNode.id

___

### index

• `get` **index**(): `number`

#### Returns

`number`

#### Inherited from

BaseNode.index

___

### isContainer

• `get` **isContainer**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseNode.isContainer

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Inherited from

BaseNode.label

• `set` **label**(`l`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/FormJsonTypes.md#label) |

#### Returns

`void`

#### Inherited from

BaseNode.label

___

### name

• `get` **name**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

BaseNode.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Inherited from

BaseNode.parent

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

ScriptableField.ruleEngine

#### Inherited from

BaseNode.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/FormJsonTypes.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Implementation of

[ScriptableField](../interfaces/FormModel.ScriptableField.md).[rules](../interfaces/FormModel.ScriptableField.md#rules)

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

BaseNode.type

___

### viewType

• `get` **viewType**(): `string`

#### Returns

`string`

#### Inherited from

BaseNode.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

BaseNode.visible

• `set` **visible**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Inherited from

BaseNode.visible

## Properties

### value

• `Abstract` **value**: [`Primitives`](../modules/FormJsonTypes.md#primitives)

The current value of the Field. The property is serialized in the Data Model.

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[value](BaseNode.BaseNode-1.md#value)