# Class: default<T\>

[Scriptable](../modules/Scriptable.md).default

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`RulesJson`](../modules/types_Json.md#rulesjson) |

## Hierarchy

- [`BaseNode`](BaseNode.BaseNode-1.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`default`](Container.default.md)

  ↳↳ [`default`](Field.default.md)

## Implements

- [`ScriptableField`](../interfaces/types_Model.ScriptableField.md)

## Table of contents

### Methods

- [\_bindToDataModel](Scriptable.default.md#_bindtodatamodel)
- [\_setProperty](Scriptable.default.md#_setproperty)
- [addDependent](Scriptable.default.md#adddependent)
- [defaultDataModel](Scriptable.default.md#defaultdatamodel)
- [directReferences](Scriptable.default.md#directreferences)
- [dispatch](Scriptable.default.md#dispatch)
- [executeAction](Scriptable.default.md#executeaction)
- [executeAllRules](Scriptable.default.md#executeallrules)
- [executeRule](Scriptable.default.md#executerule)
- [getDataNode](Scriptable.default.md#getdatanode)
- [getRuleNode](Scriptable.default.md#getrulenode)
- [getState](Scriptable.default.md#getstate)
- [importData](Scriptable.default.md#importdata)
- [notifyDependents](Scriptable.default.md#notifydependents)
- [queueEvent](Scriptable.default.md#queueevent)
- [removeDependent](Scriptable.default.md#removedependent)
- [setupRuleNode](Scriptable.default.md#setuprulenode)
- [subscribe](Scriptable.default.md#subscribe)

### Properties

- [\_jsonModel](Scriptable.default.md#_jsonmodel)
- [value](Scriptable.default.md#value)

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

[BaseNode](BaseNode.BaseNode-1.md).[_bindToDataModel](BaseNode.BaseNode-1.md#_bindtodatamodel)

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

### directReferences

▸ **directReferences**(): [`default`](Scriptable.default.md)<`T`\>

#### Returns

[`default`](Scriptable.default.md)<`T`\>

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[directReferences](BaseNode.BaseNode-1.md#directreferences)

___

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[dispatch](BaseNode.BaseNode-1.md#dispatch)

___

### executeAction

▸ **executeAction**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Overrides

[BaseNode](BaseNode.BaseNode-1.md).[executeAction](BaseNode.BaseNode-1.md#executeaction)

___

### executeAllRules

▸ `Protected` **executeAllRules**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |

#### Returns

`void`

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

___

### getDataNode

▸ **getDataNode**(): `undefined` \| `default`

#### Returns

`undefined` \| `default`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[getDataNode](BaseNode.BaseNode-1.md#getdatanode)

___

### getRuleNode

▸ **getRuleNode**(): `any`

#### Returns

`any`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[getRuleNode](BaseNode.BaseNode-1.md#getrulenode)

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

### notifyDependents

▸ **notifyDependents**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[notifyDependents](BaseNode.BaseNode-1.md#notifydependents)

___

### queueEvent

▸ **queueEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[queueEvent](BaseNode.BaseNode-1.md#queueevent)

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

[BaseNode](BaseNode.BaseNode-1.md).[removeDependent](BaseNode.BaseNode-1.md#removedependent)

___

### setupRuleNode

▸ `Protected` **setupRuleNode**(): `void`

#### Returns

`void`

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[setupRuleNode](BaseNode.BaseNode-1.md#setuprulenode)

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

## Properties

### \_jsonModel

• `Protected` **\_jsonModel**: `T` & { `id`: `string`  }

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[_jsonModel](BaseNode.BaseNode-1.md#_jsonmodel)

___

### value

• `Abstract` **value**: [`Primitives`](../modules/types_Json.md#primitives)

The current value of the Field. The property is serialized in the Data Model.

#### Inherited from

[BaseNode](BaseNode.BaseNode-1.md).[value](BaseNode.BaseNode-1.md#value)

## Constructors

### constructor

• **new default**<`T`\>(`params`, `_options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`RulesJson`](../modules/types_Json.md#rulesjson) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/types_Model.FormModel.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/types_Model.ContainerModel.md) |

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

• `get` **form**(): [`FormModel`](../interfaces/types_Model.FormModel.md)

#### Returns

[`FormModel`](../interfaces/types_Model.FormModel.md)

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

• `get` **label**(): `undefined` \| [`Label`](../modules/types_Json.md#label)

#### Returns

`undefined` \| [`Label`](../modules/types_Json.md#label)

#### Inherited from

BaseNode.label

• `set` **label**(`l`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/types_Json.md#label) |

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

• `get` **parent**(): [`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

#### Returns

[`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

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

• `get` **rules**(): [`Items`](../modules/types_Json.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/types_Json.md#items)<`string`\>

#### Implementation of

[ScriptableField](../interfaces/types_Model.ScriptableField.md).[rules](../interfaces/types_Model.ScriptableField.md#rules)

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
