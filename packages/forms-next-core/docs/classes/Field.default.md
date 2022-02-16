# Class: default

[Field](../modules/Field.md).default

## Hierarchy

- [`default`](Scriptable.default.md)<[`FieldJson`](../modules/FormJsonTypes.md#fieldjson)\>

  ↳ **`default`**

  ↳↳ [`default`](Checkbox.default.md)

  ↳↳ [`default`](CheckboxGroup.default.md)

  ↳↳ [`default`](FileUpload.default.md)

## Implements

- [`FieldModel`](../interfaces/FormModel.FieldModel.md)

## Table of contents

### Methods

- [\_bindToDataModel](Field.default.md#_bindtodatamodel)
- [\_initialize](Field.default.md#_initialize)
- [\_setProperty](Field.default.md#_setproperty)
- [addDependent](Field.default.md#adddependent)
- [change](Field.default.md#change)
- [defaultDataModel](Field.default.md#defaultdatamodel)
- [directReferences](Field.default.md#directreferences)
- [dispatch](Field.default.md#dispatch)
- [executeAction](Field.default.md#executeaction)
- [executeRule](Field.default.md#executerule)
- [getDataNode](Field.default.md#getdatanode)
- [getRuleNode](Field.default.md#getrulenode)
- [getState](Field.default.md#getstate)
- [importData](Field.default.md#importdata)
- [notifyDependents](Field.default.md#notifydependents)
- [queueEvent](Field.default.md#queueevent)
- [removeDependent](Field.default.md#removedependent)
- [subscribe](Field.default.md#subscribe)
- [toString](Field.default.md#tostring)
- [triggerValidationEvent](Field.default.md#triggervalidationevent)
- [validate](Field.default.md#validate)
- [valueOf](Field.default.md#valueof)

### Constructors

- [constructor](Field.default.md#constructor)

### Accessors

- [dataRef](Field.default.md#dataref)
- [enabled](Field.default.md#enabled)
- [enum](Field.default.md#enum)
- [enumNames](Field.default.md#enumnames)
- [form](Field.default.md#form)
- [id](Field.default.md#id)
- [index](Field.default.md#index)
- [isContainer](Field.default.md#iscontainer)
- [label](Field.default.md#label)
- [name](Field.default.md#name)
- [parent](Field.default.md#parent)
- [readOnly](Field.default.md#readonly)
- [required](Field.default.md#required)
- [ruleEngine](Field.default.md#ruleengine)
- [rules](Field.default.md#rules)
- [type](Field.default.md#type)
- [valid](Field.default.md#valid)
- [value](Field.default.md#value)
- [viewType](Field.default.md#viewtype)
- [visible](Field.default.md#visible)

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

▸ **_initialize**(): `any`

#### Returns

`any`

#### Implementation of

FieldModel.\_initialize

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

### change

▸ **change**(`event`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Action`](../interfaces/FormModel.Action.md) |
| `context` | `any` |

#### Returns

`void`

___

### defaultDataModel

▸ **defaultDataModel**(`name`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`default`

#### Overrides

[default](Scriptable.default.md).[defaultDataModel](Scriptable.default.md#defaultdatamodel)

___

### directReferences

▸ **directReferences**(): [`default`](Field.default.md)

#### Returns

[`default`](Field.default.md)

#### Implementation of

FieldModel.directReferences

#### Inherited from

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[dispatch](../interfaces/FormModel.FieldModel.md#dispatch)

#### Inherited from

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

FieldModel.getRuleNode

#### Inherited from

[default](Scriptable.default.md).[getRuleNode](Scriptable.default.md#getrulenode)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[getState](../interfaces/FormModel.FieldModel.md#getstate)

#### Inherited from

[default](Scriptable.default.md).[getState](Scriptable.default.md#getstate)

___

### importData

▸ **importData**(`contextualDataModel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel` | `default` |

#### Returns

`void`

#### Implementation of

FieldModel.importData

#### Overrides

[default](Scriptable.default.md).[importData](Scriptable.default.md#importdata)

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

#### Inherited from

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[subscribe](../interfaces/FormModel.FieldModel.md#subscribe)

#### Inherited from

[default](Scriptable.default.md).[subscribe](Scriptable.default.md#subscribe)

___

### toString

▸ **toString**(): `any`

#### Returns

`any`

___

### triggerValidationEvent

▸ **triggerValidationEvent**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `any` |

#### Returns

`void`

___

### validate

▸ **validate**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

___

### valueOf

▸ **valueOf**(): `any`

#### Returns

`any`

## Constructors

### constructor

• **new default**(`params`, `_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FieldJson`](../modules/FormJsonTypes.md#fieldjson) |
| `_options` | `Object` |
| `_options.form` | [`FormModel`](../interfaces/FormModel.FormModel-1.md) |
| `_options.parent` | [`ContainerModel`](../interfaces/FormModel.ContainerModel.md) |

#### Overrides

[default](Scriptable.default.md).[constructor](Scriptable.default.md#constructor)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[dataRef](../interfaces/FormModel.FieldModel.md#dataref)

#### Inherited from

Scriptable.dataRef

___

### enabled

• `get` **enabled**(): `undefined` \| `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enabled](../interfaces/FormModel.FieldModel.md#enabled)

• `set` **enabled**(`e`): `void`

Whether the field is enabled and takes part in rules, events etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enabled](../interfaces/FormModel.FieldModel.md#enabled)

___

### enum

• `get` **enum**(): `undefined` \| `any`[]

#### Returns

`undefined` \| `any`[]

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enum](../interfaces/FormModel.FieldModel.md#enum)

• `set` **enum**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `any`[] |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enum](../interfaces/FormModel.FieldModel.md#enum)

___

### enumNames

• `get` **enumNames**(): `undefined` \| `string`[]

#### Returns

`undefined` \| `string`[]

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enumNames](../interfaces/FormModel.FieldModel.md#enumnames)

• `set` **enumNames**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `string`[] |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enumNames](../interfaces/FormModel.FieldModel.md#enumnames)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[id](../interfaces/FormModel.FieldModel.md#id)

#### Inherited from

Scriptable.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[index](../interfaces/FormModel.FieldModel.md#index)

#### Inherited from

Scriptable.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[isContainer](../interfaces/FormModel.FieldModel.md#iscontainer)

#### Inherited from

Scriptable.isContainer

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[label](../interfaces/FormModel.FieldModel.md#label)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[label](../interfaces/FormModel.FieldModel.md#label)

#### Inherited from

Scriptable.label

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[name](../interfaces/FormModel.FieldModel.md#name)

#### Inherited from

Scriptable.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[parent](../interfaces/FormModel.FieldModel.md#parent)

#### Inherited from

Scriptable.parent

___

### readOnly

• `get` **readOnly**(): `undefined` \| `boolean`

Whether the field should be readOnly to end user or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[readOnly](../interfaces/FormModel.FieldModel.md#readonly)

• `set` **readOnly**(`e`): `void`

Whether the field should be readOnly to end user or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[readOnly](../interfaces/FormModel.FieldModel.md#readonly)

___

### required

• `get` **required**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[required](../interfaces/FormModel.FieldModel.md#required)

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

FieldModel.ruleEngine

#### Inherited from

Scriptable.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/FormJsonTypes.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[rules](../interfaces/FormModel.FieldModel.md#rules)

#### Inherited from

Scriptable.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[type](../interfaces/FormModel.FieldModel.md#type)

#### Inherited from

Scriptable.type

___

### valid

• `get` **valid**(): `undefined` \| `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[valid](../interfaces/FormModel.FieldModel.md#valid)

___

### value

• `get` **value**(): `any`

The current value of the Field. The property is serialized in the Data Model.

#### Returns

`any`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[value](../interfaces/FormModel.FieldModel.md#value)

#### Overrides

Scriptable.value

• `set` **value**(`v`): `void`

The current value of the Field. The property is serialized in the Data Model.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `any` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[value](../interfaces/FormModel.FieldModel.md#value)

#### Overrides

Scriptable.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[viewType](../interfaces/FormModel.FieldModel.md#viewtype)

#### Inherited from

Scriptable.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[visible](../interfaces/FormModel.FieldModel.md#visible)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[visible](../interfaces/FormModel.FieldModel.md#visible)

#### Inherited from

Scriptable.visible
