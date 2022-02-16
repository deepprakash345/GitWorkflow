# Class: default

[FileUpload](../modules/FileUpload.md).default

Implementation of FileUpload runtime model which extends from [field](../modules/Field.md)

## Hierarchy

- [`default`](Field.default.md)

  ↳ **`default`**

## Implements

- [`FieldModel`](../interfaces/FormModel.FieldModel.md)

## Table of contents

### Methods

- [\_setProperty](FileUpload.default.md#_setproperty)
- [addDependent](FileUpload.default.md#adddependent)
- [change](FileUpload.default.md#change)
- [dispatch](FileUpload.default.md#dispatch)
- [executeAction](FileUpload.default.md#executeaction)
- [getState](FileUpload.default.md#getstate)
- [importData](FileUpload.default.md#importdata)
- [removeDependent](FileUpload.default.md#removedependent)
- [subscribe](FileUpload.default.md#subscribe)
- [toString](FileUpload.default.md#tostring)
- [triggerValidationEvent](FileUpload.default.md#triggervalidationevent)
- [validate](FileUpload.default.md#validate)
- [valueOf](FileUpload.default.md#valueof)

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

#### Inherited from

[default](Field.default.md).[_setProperty](Field.default.md#_setproperty)

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

[default](Field.default.md).[addDependent](Field.default.md#adddependent)

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

#### Inherited from

[default](Field.default.md).[change](Field.default.md#change)

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

FieldModel.dispatch

#### Inherited from

[default](Field.default.md).[dispatch](Field.default.md#dispatch)

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

#### Inherited from

[default](Field.default.md).[executeAction](Field.default.md#executeaction)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

[state](../modules/FormModel.md#state) of the form object

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[getState](../interfaces/FormModel.FieldModel.md#getstate)

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

### removeDependent

▸ **removeDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[removeDependent](Field.default.md#removedependent)

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

FieldModel.subscribe

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

Validates the current form object

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

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

## Accessors

### accept

• `get` **accept**(): `undefined` \| `string`[]

Returns the list of mime types which file attachment can accept

#### Returns

`undefined` \| `string`[]

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[accept](../interfaces/FormModel.FieldModel.md#accept)

___

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[dataRef](../interfaces/FormModel.FieldModel.md#dataref)

#### Inherited from

Field.dataRef

___

### enabled

• `get` **enabled**(): `undefined` \| `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enabled](../interfaces/FormModel.FieldModel.md#enabled)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[enabled](../interfaces/FormModel.FieldModel.md#enabled)

#### Inherited from

Field.enabled

___

### enum

• `get` **enum**(): `undefined` \| `any`[]

#### Returns

`undefined` \| `any`[]

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enum](../interfaces/FormModel.FieldModel.md#enum)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[enum](../interfaces/FormModel.FieldModel.md#enum)

#### Inherited from

Field.enum

___

### enumNames

• `get` **enumNames**(): `undefined` \| `string`[]

#### Returns

`undefined` \| `string`[]

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[enumNames](../interfaces/FormModel.FieldModel.md#enumnames)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[enumNames](../interfaces/FormModel.FieldModel.md#enumnames)

#### Inherited from

Field.enumNames

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Inherited from

Field.form

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[id](../interfaces/FormModel.FieldModel.md#id)

#### Inherited from

Field.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[index](../interfaces/FormModel.FieldModel.md#index)

#### Inherited from

Field.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[isContainer](../interfaces/FormModel.FieldModel.md#iscontainer)

#### Inherited from

Field.isContainer

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[label](../interfaces/FormModel.FieldModel.md#label)

#### Inherited from

Field.label

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

Field.label

___

### maxFileSize

• `get` **maxFileSize**(): `number`

Returns the max file size in bytes as per IEC specification

#### Returns

`number`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[maxFileSize](../interfaces/FormModel.FieldModel.md#maxfilesize)

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[name](../interfaces/FormModel.FieldModel.md#name)

#### Inherited from

Field.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

Parent of the current field

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[parent](../interfaces/FormModel.FieldModel.md#parent)

#### Inherited from

Field.parent

___

### readOnly

• `get` **readOnly**(): `undefined` \| `boolean`

Whether the field should be readOnly to end user or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[readOnly](../interfaces/FormModel.FieldModel.md#readonly)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[readOnly](../interfaces/FormModel.FieldModel.md#readonly)

#### Inherited from

Field.readOnly

___

### required

• `get` **required**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[required](../interfaces/FormModel.FieldModel.md#required)

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

• `get` **rules**(): [`Items`](../modules/FormJsonTypes.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[rules](../interfaces/FormModel.FieldModel.md#rules)

#### Inherited from

Field.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[type](../interfaces/FormModel.FieldModel.md#type)

#### Inherited from

Field.type

___

### valid

• `get` **valid**(): `undefined` \| `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[valid](../interfaces/FormModel.FieldModel.md#valid)

#### Inherited from

Field.valid

___

### value

• `get` **value**(): `any`

The current value of the Field. The property is serialized in the Data Model.

#### Returns

`any`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[value](../interfaces/FormModel.FieldModel.md#value)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[value](../interfaces/FormModel.FieldModel.md#value)

#### Overrides

Field.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[viewType](../interfaces/FormModel.FieldModel.md#viewtype)

#### Inherited from

Field.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldModel](../interfaces/FormModel.FieldModel.md).[visible](../interfaces/FormModel.FieldModel.md#visible)

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

[FieldModel](../interfaces/FormModel.FieldModel.md).[visible](../interfaces/FormModel.FieldModel.md#visible)

#### Inherited from

Field.visible
