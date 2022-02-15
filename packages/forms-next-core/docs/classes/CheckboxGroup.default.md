# Class: default

[CheckboxGroup](../modules/CheckboxGroup.md).default

## Hierarchy

- [`default`](Field.default.md)

  ↳ **`default`**

## Table of contents

### Methods

- [\_applyDefaults](CheckboxGroup.default.md#_applydefaults)
- [\_bindToDataModel](CheckboxGroup.default.md#_bindtodatamodel)
- [\_getDefaults](CheckboxGroup.default.md#_getdefaults)
- [\_initialize](CheckboxGroup.default.md#_initialize)
- [\_setProperty](CheckboxGroup.default.md#_setproperty)
- [addDependent](CheckboxGroup.default.md#adddependent)
- [change](CheckboxGroup.default.md#change)
- [checkInput](CheckboxGroup.default.md#checkinput)
- [defaultDataModel](CheckboxGroup.default.md#defaultdatamodel)
- [directReferences](CheckboxGroup.default.md#directreferences)
- [dispatch](CheckboxGroup.default.md#dispatch)
- [executeAction](CheckboxGroup.default.md#executeaction)
- [executeAllRules](CheckboxGroup.default.md#executeallrules)
- [executeRule](CheckboxGroup.default.md#executerule)
- [getDataNode](CheckboxGroup.default.md#getdatanode)
- [getRuleNode](CheckboxGroup.default.md#getrulenode)
- [getState](CheckboxGroup.default.md#getstate)
- [importData](CheckboxGroup.default.md#importdata)
- [notifyDependents](CheckboxGroup.default.md#notifydependents)
- [queueEvent](CheckboxGroup.default.md#queueevent)
- [removeDependent](CheckboxGroup.default.md#removedependent)
- [setupRuleNode](CheckboxGroup.default.md#setuprulenode)
- [subscribe](CheckboxGroup.default.md#subscribe)
- [toString](CheckboxGroup.default.md#tostring)
- [triggerValidationEvent](CheckboxGroup.default.md#triggervalidationevent)
- [validate](CheckboxGroup.default.md#validate)
- [valueOf](CheckboxGroup.default.md#valueof)

### Properties

- [\_jsonModel](CheckboxGroup.default.md#_jsonmodel)

### Constructors

- [constructor](CheckboxGroup.default.md#constructor)

### Accessors

- [dataRef](CheckboxGroup.default.md#dataref)
- [enabled](CheckboxGroup.default.md#enabled)
- [enum](CheckboxGroup.default.md#enum)
- [enumNames](CheckboxGroup.default.md#enumnames)
- [form](CheckboxGroup.default.md#form)
- [id](CheckboxGroup.default.md#id)
- [index](CheckboxGroup.default.md#index)
- [isContainer](CheckboxGroup.default.md#iscontainer)
- [label](CheckboxGroup.default.md#label)
- [name](CheckboxGroup.default.md#name)
- [parent](CheckboxGroup.default.md#parent)
- [readOnly](CheckboxGroup.default.md#readonly)
- [required](CheckboxGroup.default.md#required)
- [ruleEngine](CheckboxGroup.default.md#ruleengine)
- [rules](CheckboxGroup.default.md#rules)
- [type](CheckboxGroup.default.md#type)
- [valid](CheckboxGroup.default.md#valid)
- [value](CheckboxGroup.default.md#value)
- [viewType](CheckboxGroup.default.md#viewtype)
- [visible](CheckboxGroup.default.md#visible)

## Methods

### \_applyDefaults

▸ `Protected` **_applyDefaults**(): `void`

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[_applyDefaults](Field.default.md#_applydefaults)

___

### \_bindToDataModel

▸ **_bindToDataModel**(`contextualDataModel?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel?` | `default` |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[_bindToDataModel](Field.default.md#_bindtodatamodel)

___

### \_getDefaults

▸ `Protected` **_getDefaults**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |
| `enforceEnum` | `boolean` |
| `readOnly` | `boolean` |
| `type` | `string` |
| `visible` | `boolean` |

#### Overrides

[default](Field.default.md).[_getDefaults](Field.default.md#_getdefaults)

___

### \_initialize

▸ **_initialize**(): `any`

#### Returns

`any`

#### Inherited from

[default](Field.default.md).[_initialize](Field.default.md#_initialize)

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

[default](Field.default.md).[_setProperty](Field.default.md#_setproperty)

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

[default](Field.default.md).[addDependent](Field.default.md#adddependent)

___

### change

▸ **change**(`event`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[change](Field.default.md#change)

___

### checkInput

▸ `Protected` **checkInput**(`input`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

#### Returns

`any`

#### Inherited from

[default](Field.default.md).[checkInput](Field.default.md#checkinput)

___

### defaultDataModel

▸ **defaultDataModel**(`name`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`default`

#### Inherited from

[default](Field.default.md).[defaultDataModel](Field.default.md#defaultdatamodel)

___

### directReferences

▸ **directReferences**(): [`default`](CheckboxGroup.default.md)

#### Returns

[`default`](CheckboxGroup.default.md)

#### Inherited from

[default](Field.default.md).[directReferences](Field.default.md#directreferences)

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

[default](Field.default.md).[dispatch](Field.default.md#dispatch)

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

[default](Field.default.md).[executeAction](Field.default.md#executeaction)

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

[default](Field.default.md).[executeAllRules](Field.default.md#executeallrules)

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

[default](Field.default.md).[executeRule](Field.default.md#executerule)

___

### getDataNode

▸ **getDataNode**(): `undefined` \| `default`

#### Returns

`undefined` \| `default`

#### Inherited from

[default](Field.default.md).[getDataNode](Field.default.md#getdatanode)

___

### getRuleNode

▸ **getRuleNode**(): `any`

#### Returns

`any`

#### Inherited from

[default](Field.default.md).[getRuleNode](Field.default.md#getrulenode)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Inherited from

[default](Field.default.md).[getState](Field.default.md#getstate)

___

### importData

▸ **importData**(`contextualDataModel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel` | `default` |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[importData](Field.default.md#importdata)

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

[default](Field.default.md).[notifyDependents](Field.default.md#notifydependents)

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

[default](Field.default.md).[queueEvent](Field.default.md#queueevent)

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

[default](Field.default.md).[removeDependent](Field.default.md#removedependent)

___

### setupRuleNode

▸ `Protected` **setupRuleNode**(): `void`

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[setupRuleNode](Field.default.md#setuprulenode)

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

[default](Field.default.md).[subscribe](Field.default.md#subscribe)

___

### toString

▸ **toString**(): `any`

#### Returns

`any`

#### Inherited from

[default](Field.default.md).[toString](Field.default.md#tostring)

___

### triggerValidationEvent

▸ **triggerValidationEvent**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `any` |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[triggerValidationEvent](Field.default.md#triggervalidationevent)

___

### validate

▸ **validate**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[validate](Field.default.md#validate)

___

### valueOf

▸ **valueOf**(): `any`

#### Returns

`any`

#### Inherited from

[default](Field.default.md).[valueOf](Field.default.md#valueof)

## Properties

### \_jsonModel

• `Protected` **\_jsonModel**: `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Inherited from

[default](Field.default.md).[_jsonModel](Field.default.md#_jsonmodel)

## Constructors

### constructor

• **new default**(`params`, `_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FieldJson`](../modules/types_Json.md#fieldjson) |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/types_Model.FormModel.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/types_Model.ContainerModel.md) |

#### Overrides

[default](Field.default.md).[constructor](Field.default.md#constructor)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

#### Returns

`undefined` \| ``null`` \| `string`

#### Inherited from

Field.dataRef

___

### enabled

• `get` **enabled**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.enabled

• `set` **enabled**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Inherited from

Field.enabled

___

### enum

• `get` **enum**(): `any`[]

#### Returns

`any`[]

#### Overrides

Field.enum

___

### enumNames

• `get` **enumNames**(): `undefined` \| `string`[]

#### Returns

`undefined` \| `string`[]

#### Inherited from

Field.enumNames

• `set` **enumNames**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `string`[] |

#### Returns

`void`

#### Inherited from

Field.enumNames

___

### form

• `get` **form**(): [`FormModel`](../interfaces/types_Model.FormModel.md)

#### Returns

[`FormModel`](../interfaces/types_Model.FormModel.md)

#### Inherited from

Field.form

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

Field.id

___

### index

• `get` **index**(): `number`

#### Returns

`number`

#### Inherited from

Field.index

___

### isContainer

• `get` **isContainer**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Field.isContainer

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/types_Json.md#label)

#### Returns

`undefined` \| [`Label`](../modules/types_Json.md#label)

#### Inherited from

Field.label

• `set` **label**(`l`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/types_Json.md#label) |

#### Returns

`void`

#### Inherited from

Field.label

___

### name

• `get` **name**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

Field.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

#### Returns

[`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

#### Inherited from

Field.parent

___

### readOnly

• `get` **readOnly**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.readOnly

• `set` **readOnly**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Inherited from

Field.readOnly

___

### required

• `get` **required**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Field.required

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Inherited from

Field.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/types_Json.md#items)<`string`\>

#### Returns

[`Items`](../modules/types_Json.md#items)<`string`\>

#### Inherited from

Field.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

Field.type

___

### valid

• `get` **valid**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.valid

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Inherited from

Field.value

• `set` **value**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `any` |

#### Returns

`void`

#### Inherited from

Field.value

___

### viewType

• `get` **viewType**(): `string`

#### Returns

`string`

#### Inherited from

Field.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.visible

• `set` **visible**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Inherited from

Field.visible
