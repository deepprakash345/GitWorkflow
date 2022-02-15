# Class: default

[FileUpload](../modules/FileUpload.md).default

## Hierarchy

- [`default`](Field.default.md)

  ↳ **`default`**

## Implements

- [`FieldModel`](../interfaces/types_Model.FieldModel.md)

## Table of contents

### Methods

- [\_applyDefaults](FileUpload.default.md#_applydefaults)
- [\_bindToDataModel](FileUpload.default.md#_bindtodatamodel)
- [\_getDefaults](FileUpload.default.md#_getdefaults)
- [\_initialize](FileUpload.default.md#_initialize)
- [\_setProperty](FileUpload.default.md#_setproperty)
- [addDependent](FileUpload.default.md#adddependent)
- [change](FileUpload.default.md#change)
- [checkInput](FileUpload.default.md#checkinput)
- [defaultDataModel](FileUpload.default.md#defaultdatamodel)
- [directReferences](FileUpload.default.md#directreferences)
- [dispatch](FileUpload.default.md#dispatch)
- [executeAction](FileUpload.default.md#executeaction)
- [executeAllRules](FileUpload.default.md#executeallrules)
- [executeRule](FileUpload.default.md#executerule)
- [getDataNode](FileUpload.default.md#getdatanode)
- [getRuleNode](FileUpload.default.md#getrulenode)
- [getState](FileUpload.default.md#getstate)
- [importData](FileUpload.default.md#importdata)
- [notifyDependents](FileUpload.default.md#notifydependents)
- [queueEvent](FileUpload.default.md#queueevent)
- [removeDependent](FileUpload.default.md#removedependent)
- [setupRuleNode](FileUpload.default.md#setuprulenode)
- [subscribe](FileUpload.default.md#subscribe)
- [toString](FileUpload.default.md#tostring)
- [triggerValidationEvent](FileUpload.default.md#triggervalidationevent)
- [validate](FileUpload.default.md#validate)
- [valueOf](FileUpload.default.md#valueof)

### Properties

- [\_jsonModel](FileUpload.default.md#_jsonmodel)

### Accessors

- [accept](FileUpload.default.md#accept)
- [dataRef](FileUpload.default.md#dataref)
- [enabled](FileUpload.default.md#enabled)
- [enum](FileUpload.default.md#enum)
- [enumNames](FileUpload.default.md#enumnames)
- [form](FileUpload.default.md#form)
- [id](FileUpload.default.md#id)
- [index](FileUpload.default.md#index)
- [isContainer](FileUpload.default.md#iscontainer)
- [label](FileUpload.default.md#label)
- [maxFileSize](FileUpload.default.md#maxfilesize)
- [name](FileUpload.default.md#name)
- [parent](FileUpload.default.md#parent)
- [readOnly](FileUpload.default.md#readonly)
- [required](FileUpload.default.md#required)
- [ruleEngine](FileUpload.default.md#ruleengine)
- [rules](FileUpload.default.md#rules)
- [type](FileUpload.default.md#type)
- [valid](FileUpload.default.md#valid)
- [value](FileUpload.default.md#value)
- [viewType](FileUpload.default.md#viewtype)
- [visible](FileUpload.default.md#visible)

### Constructors

- [constructor](FileUpload.default.md#constructor)

## Methods

### \_applyDefaults

▸ `Protected` **_applyDefaults**(): `void`

#### Returns

`void`

#### Overrides

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
| `readOnly` | `boolean` |
| `type` | `string` |
| `visible` | `boolean` |

#### Inherited from

[default](Field.default.md).[_getDefaults](Field.default.md#_getdefaults)

___

### \_initialize

▸ **_initialize**(): `any`

#### Returns

`any`

#### Implementation of

FieldModel.\_initialize

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

▸ **directReferences**(): [`default`](FileUpload.default.md)

#### Returns

[`default`](FileUpload.default.md)

#### Implementation of

FieldModel.directReferences

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

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[dispatch](../interfaces/types_Model.FieldModel.md#dispatch)

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

#### Implementation of

FieldModel.getRuleNode

#### Inherited from

[default](Field.default.md).[getRuleNode](Field.default.md#getrulenode)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[getState](../interfaces/types_Model.FieldModel.md#getstate)

#### Inherited from

[default](Field.default.md).[getState](Field.default.md#getstate)

___

### importData

▸ **importData**(`dataModel?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataModel?` | `default` |

#### Returns

`void`

#### Implementation of

FieldModel.importData

#### Overrides

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

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[subscribe](../interfaces/types_Model.FieldModel.md#subscribe)

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

## Accessors

### accept

• `get` **accept**(): `undefined` \| `string`[]

#### Returns

`undefined` \| `string`[]

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[accept](../interfaces/types_Model.FieldModel.md#accept)

___

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[dataRef](../interfaces/types_Model.FieldModel.md#dataref)

#### Inherited from

Field.dataRef

___

### enabled

• `get` **enabled**(): `undefined` \| `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[enabled](../interfaces/types_Model.FieldModel.md#enabled)

#### Inherited from

Field.enabled

• `set` **enabled**(`e`): `void`

Whether the field is enabled and takes part in rules, events etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[enabled](../interfaces/types_Model.FieldModel.md#enabled)

#### Inherited from

Field.enabled

___

### enum

• `get` **enum**(): `undefined` \| `any`[]

#### Returns

`undefined` \| `any`[]

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[enum](../interfaces/types_Model.FieldModel.md#enum)

#### Inherited from

Field.enum

• `set` **enum**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `any`[] |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[enum](../interfaces/types_Model.FieldModel.md#enum)

#### Inherited from

Field.enum

___

### enumNames

• `get` **enumNames**(): `undefined` \| `string`[]

#### Returns

`undefined` \| `string`[]

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[enumNames](../interfaces/types_Model.FieldModel.md#enumnames)

#### Inherited from

Field.enumNames

• `set` **enumNames**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `string`[] |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[enumNames](../interfaces/types_Model.FieldModel.md#enumnames)

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

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[id](../interfaces/types_Model.FieldModel.md#id)

#### Inherited from

Field.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[index](../interfaces/types_Model.FieldModel.md#index)

#### Inherited from

Field.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[isContainer](../interfaces/types_Model.FieldModel.md#iscontainer)

#### Inherited from

Field.isContainer

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/types_Json.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/types_Json.md#label)

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[label](../interfaces/types_Model.FieldModel.md#label)

#### Inherited from

Field.label

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/types_Json.md#label) |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[label](../interfaces/types_Model.FieldModel.md#label)

#### Inherited from

Field.label

___

### maxFileSize

• `get` **maxFileSize**(): `number`

#### Returns

`number`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[maxFileSize](../interfaces/types_Model.FieldModel.md#maxfilesize)

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[name](../interfaces/types_Model.FieldModel.md#name)

#### Inherited from

Field.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[parent](../interfaces/types_Model.FieldModel.md#parent)

#### Inherited from

Field.parent

___

### readOnly

• `get` **readOnly**(): `undefined` \| `boolean`

Whether the field should be readOnly to end user or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[readOnly](../interfaces/types_Model.FieldModel.md#readonly)

#### Inherited from

Field.readOnly

• `set` **readOnly**(`e`): `void`

Whether the field should be readOnly to end user or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[readOnly](../interfaces/types_Model.FieldModel.md#readonly)

#### Inherited from

Field.readOnly

___

### required

• `get` **required**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[required](../interfaces/types_Model.FieldModel.md#required)

#### Inherited from

Field.required

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

FieldModel.ruleEngine

#### Inherited from

Field.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/types_Json.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/types_Json.md#items)<`string`\>

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[rules](../interfaces/types_Model.FieldModel.md#rules)

#### Inherited from

Field.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[type](../interfaces/types_Model.FieldModel.md#type)

#### Inherited from

Field.type

___

### valid

• `get` **valid**(): `undefined` \| `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[valid](../interfaces/types_Model.FieldModel.md#valid)

#### Inherited from

Field.valid

___

### value

• `get` **value**(): `any`

The current value of the Field. The property is serialized in the Data Model.

#### Returns

`any`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[value](../interfaces/types_Model.FieldModel.md#value)

#### Overrides

Field.value

• `set` **value**(`payload`): `void`

The current value of the Field. The property is serialized in the Data Model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[value](../interfaces/types_Model.FieldModel.md#value)

#### Overrides

Field.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[viewType](../interfaces/types_Model.FieldModel.md#viewtype)

#### Inherited from

Field.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[visible](../interfaces/types_Model.FieldModel.md#visible)

#### Inherited from

Field.visible

• `set` **visible**(`v`): `void`

Whether the field should be visible to author or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/types_Model.FieldModel.md).[visible](../interfaces/types_Model.FieldModel.md#visible)

#### Inherited from

Field.visible

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

#### Inherited from

[default](Field.default.md).[constructor](Field.default.md#constructor)
