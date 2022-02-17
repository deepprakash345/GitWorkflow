# Class: Field

Defines a form object field which implements [field model](../interfaces/FieldModel.md) interface

## Hierarchy

- [`Scriptable`](Scriptable.md)<[`FieldJson`](../README.md#fieldjson)\>

  ↳ **`Field`**

  ↳↳ [`Checkbox`](Checkbox.md)

  ↳↳ [`CheckboxGroup`](CheckboxGroup.md)

  ↳↳ [`FileUpload`](FileUpload.md)

## Implements

- [`FieldModel`](../interfaces/FieldModel.md)

## Table of contents

### Methods

- [change](Field.md#change)
- [dispatch](Field.md#dispatch)
- [executeAction](Field.md#executeaction)
- [getState](Field.md#getstate)
- [importData](Field.md#importdata)
- [toString](Field.md#tostring)
- [triggerValidationEvent](Field.md#triggervalidationevent)
- [validate](Field.md#validate)
- [valueOf](Field.md#valueof)

### Accessors

- [dataRef](Field.md#dataref)
- [enabled](Field.md#enabled)
- [enum](Field.md#enum)
- [enumNames](Field.md#enumnames)
- [form](Field.md#form)
- [id](Field.md#id)
- [index](Field.md#index)
- [isContainer](Field.md#iscontainer)
- [label](Field.md#label)
- [name](Field.md#name)
- [parent](Field.md#parent)
- [readOnly](Field.md#readonly)
- [required](Field.md#required)
- [ruleEngine](Field.md#ruleengine)
- [rules](Field.md#rules)
- [type](Field.md#type)
- [valid](Field.md#valid)
- [value](Field.md#value)
- [viewType](Field.md#viewtype)
- [visible](Field.md#visible)

## Methods

### change

▸ **change**(`event`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Action`](../interfaces/Action.md) |
| `context` | `any` |

#### Returns

`void`

___

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/Action.md) |

#### Returns

`void`

#### Implementation of

FieldModel.dispatch

#### Inherited from

[Scriptable](Scriptable.md).[dispatch](Scriptable.md#dispatch)

___

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

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../README.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../README.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../README.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

[state](../README.md#state) of the form object

#### Returns

`TranslationBaseJson` & [`RulesJson`](../README.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../README.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../README.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[getState](../interfaces/FieldModel.md#getstate)

#### Inherited from

[Scriptable](Scriptable.md).[getState](Scriptable.md#getstate)

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

[Scriptable](Scriptable.md).[importData](Scriptable.md#importdata)

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

▸ **validate**(): [`ValidationError`](ValidationError.md)[]

Validates the current form object

#### Returns

[`ValidationError`](ValidationError.md)[]

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[validate](../interfaces/FieldModel.md#validate)

#### Overrides

[Scriptable](Scriptable.md).[validate](Scriptable.md#validate)

___

### valueOf

▸ **valueOf**(): `any`

#### Returns

`any`

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[dataRef](../interfaces/FieldModel.md#dataref)

#### Inherited from

Scriptable.dataRef

___

### enabled

• `get` **enabled**(): `undefined` \| `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[enabled](../interfaces/FieldModel.md#enabled)

• `set` **enabled**(`e`): `void`

Whether the field is enabled and takes part in rules, events etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[enabled](../interfaces/FieldModel.md#enabled)

___

### enum

• `get` **enum**(): `undefined` \| `any`[]

#### Returns

`undefined` \| `any`[]

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[enum](../interfaces/FieldModel.md#enum)

• `set` **enum**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `any`[] |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[enum](../interfaces/FieldModel.md#enum)

___

### enumNames

• `get` **enumNames**(): `undefined` \| `string`[]

#### Returns

`undefined` \| `string`[]

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[enumNames](../interfaces/FieldModel.md#enumnames)

• `set` **enumNames**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `string`[] |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[enumNames](../interfaces/FieldModel.md#enumnames)

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

[FieldModel](../interfaces/FieldModel.md).[id](../interfaces/FieldModel.md#id)

#### Inherited from

Scriptable.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[index](../interfaces/FieldModel.md#index)

#### Inherited from

Scriptable.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[isContainer](../interfaces/FieldModel.md#iscontainer)

#### Inherited from

Scriptable.isContainer

___

### label

• `get` **label**(): `undefined` \| [`Label`](../README.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../README.md#label)

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[label](../interfaces/FieldModel.md#label)

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

[FieldModel](../interfaces/FieldModel.md).[label](../interfaces/FieldModel.md#label)

#### Inherited from

Scriptable.label

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[name](../interfaces/FieldModel.md#name)

#### Inherited from

Scriptable.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/ContainerModel.md)

Parent of the current field

#### Returns

[`ContainerModel`](../interfaces/ContainerModel.md)

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[parent](../interfaces/FieldModel.md#parent)

#### Inherited from

Scriptable.parent

___

### readOnly

• `get` **readOnly**(): `undefined` \| `boolean`

Whether the field should be readOnly to end user or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[readOnly](../interfaces/FieldModel.md#readonly)

• `set` **readOnly**(`e`): `void`

Whether the field should be readOnly to end user or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[readOnly](../interfaces/FieldModel.md#readonly)

___

### required

• `get` **required**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[required](../interfaces/FieldModel.md#required)

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

• `get` **rules**(): [`Items`](../README.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../README.md#items)<`string`\>

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[rules](../interfaces/FieldModel.md#rules)

#### Inherited from

Scriptable.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[type](../interfaces/FieldModel.md#type)

#### Inherited from

Scriptable.type

___

### valid

• `get` **valid**(): `undefined` \| `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[valid](../interfaces/FieldModel.md#valid)

___

### value

• `get` **value**(): `any`

The current value of the Field. The property is serialized in the Data Model.

#### Returns

`any`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[value](../interfaces/FieldModel.md#value)

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

[FieldModel](../interfaces/FieldModel.md).[value](../interfaces/FieldModel.md#value)

#### Overrides

Scriptable.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[viewType](../interfaces/FieldModel.md#viewtype)

#### Inherited from

Scriptable.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FieldModel.md).[visible](../interfaces/FieldModel.md#visible)

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

[FieldModel](../interfaces/FieldModel.md).[visible](../interfaces/FieldModel.md#visible)

#### Inherited from

Scriptable.visible
