# Interface: FormModel

[types/Model](../modules/types_Model.md).FormModel

Defines the interface for form model

## Hierarchy

- [`ContainerModel`](types_Model.ContainerModel.md)

- `WithContainerState`<[`FormJson`](../modules/types_Json.md#formjson)\>

  ↳ **`FormModel`**

## Implemented by

- [`default`](../classes/Form.default.md)

## Table of contents

### Properties

- [accept](types_Model.FormModel.md#accept)
- [data](types_Model.FormModel.md#data)
- [dataRef](types_Model.FormModel.md#dataref)
- [default](types_Model.FormModel.md#default)
- [description](types_Model.FormModel.md#description)
- [enabled](types_Model.FormModel.md#enabled)
- [enforceEnum](types_Model.FormModel.md#enforceenum)
- [enum](types_Model.FormModel.md#enum)
- [enumNames](types_Model.FormModel.md#enumnames)
- [events](types_Model.FormModel.md#events)
- [expression](types_Model.FormModel.md#expression)
- [format](types_Model.FormModel.md#format)
- [fracDigits](types_Model.FormModel.md#fracdigits)
- [id](types_Model.FormModel.md#id)
- [index](types_Model.FormModel.md#index)
- [isContainer](types_Model.FormModel.md#iscontainer)
- [items](types_Model.FormModel.md#items)
- [label](types_Model.FormModel.md#label)
- [leadDigits](types_Model.FormModel.md#leaddigits)
- [maxFileSize](types_Model.FormModel.md#maxfilesize)
- [maxItems](types_Model.FormModel.md#maxitems)
- [maxLength](types_Model.FormModel.md#maxlength)
- [maximum](types_Model.FormModel.md#maximum)
- [metadata](types_Model.FormModel.md#metadata)
- [minItems](types_Model.FormModel.md#minitems)
- [minLength](types_Model.FormModel.md#minlength)
- [minimum](types_Model.FormModel.md#minimum)
- [name](types_Model.FormModel.md#name)
- [parent](types_Model.FormModel.md#parent)
- [pattern](types_Model.FormModel.md#pattern)
- [placeholder](types_Model.FormModel.md#placeholder)
- [props](types_Model.FormModel.md#props)
- [readOnly](types_Model.FormModel.md#readonly)
- [required](types_Model.FormModel.md#required)
- [rules](types_Model.FormModel.md#rules)
- [title](types_Model.FormModel.md#title)
- [type](types_Model.FormModel.md#type)
- [valid](types_Model.FormModel.md#valid)
- [value](types_Model.FormModel.md#value)
- [viewType](types_Model.FormModel.md#viewtype)
- [visible](types_Model.FormModel.md#visible)

### Methods

- [dispatch](types_Model.FormModel.md#dispatch)
- [exportData](types_Model.FormModel.md#exportdata)
- [getElement](types_Model.FormModel.md#getelement)
- [getState](types_Model.FormModel.md#getstate)
- [importData](types_Model.FormModel.md#importdata)
- [indexOf](types_Model.FormModel.md#indexof)
- [subscribe](types_Model.FormModel.md#subscribe)

## Properties

### accept

• `Optional` **accept**: `string`[]

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[accept](types_Model.ContainerModel.md#accept)

___

### data

• `Optional` `Readonly` **data**: `any`

Form data

___

### dataRef

• `Optional` `Readonly` **dataRef**: ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[dataRef](types_Model.ContainerModel.md#dataref)

___

### default

• `Optional` `Readonly` **default**: `any`

Default value of the Field.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[default](types_Model.ContainerModel.md#default)

___

### description

• `Optional` **description**: `string`

Extra description to be shown to the user to aid in form filling experience. It can be rich text.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[description](types_Model.ContainerModel.md#description)

___

### enabled

• `Optional` **enabled**: `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[enabled](types_Model.ContainerModel.md#enabled)

___

### enforceEnum

• `Optional` **enforceEnum**: `boolean`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[enforceEnum](types_Model.ContainerModel.md#enforceenum)

___

### enum

• `Optional` **enum**: `any`[]

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[enum](types_Model.ContainerModel.md#enum)

___

### enumNames

• `Optional` **enumNames**: `string`[]

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[enumNames](types_Model.ContainerModel.md#enumnames)

___

### events

• `Optional` **events**: `Object`

Events is a dictionary of eventName to the actions to perform.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[events](types_Model.ContainerModel.md#events)

___

### expression

• `Optional` **expression**: `string`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[expression](types_Model.ContainerModel.md#expression)

___

### format

• `Optional` **format**: `string`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[format](types_Model.ContainerModel.md#format)

___

### fracDigits

• `Optional` **fracDigits**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[fracDigits](types_Model.ContainerModel.md#fracdigits)

___

### id

• `Readonly` **id**: `string`

Id of the form.

#### Overrides

[ContainerModel](types_Model.ContainerModel.md).[id](types_Model.ContainerModel.md#id)

___

### index

• `Readonly` **index**: `number`

The index of the Field within its parent.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[index](types_Model.ContainerModel.md#index)

___

### isContainer

• `Readonly` **isContainer**: `boolean`

Whether the form field is container or not

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[isContainer](types_Model.ContainerModel.md#iscontainer)

___

### items

• **items**: ([`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md))[]

Array containing Fields or Panels.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[items](types_Model.ContainerModel.md#items)

___

### label

• `Optional` **label**: [`Label`](../modules/types_Json.md#label)

Label to be used for the field.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[label](types_Model.ContainerModel.md#label)

___

### leadDigits

• `Optional` **leadDigits**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[leadDigits](types_Model.ContainerModel.md#leaddigits)

___

### maxFileSize

• `Optional` **maxFileSize**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[maxFileSize](types_Model.ContainerModel.md#maxfilesize)

___

### maxItems

• `Optional` **maxItems**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[maxItems](types_Model.ContainerModel.md#maxitems)

___

### maxLength

• `Optional` **maxLength**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[maxLength](types_Model.ContainerModel.md#maxlength)

___

### maximum

• `Optional` **maximum**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[maximum](types_Model.ContainerModel.md#maximum)

___

### metadata

• `Optional` `Readonly` **metadata**: [`MetaDataJson`](../modules/types_Json.md#metadatajson)

Form metadata

___

### minItems

• `Optional` **minItems**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[minItems](types_Model.ContainerModel.md#minitems)

___

### minLength

• `Optional` **minLength**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[minLength](types_Model.ContainerModel.md#minlength)

___

### minimum

• `Optional` **minimum**: `number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[minimum](types_Model.ContainerModel.md#minimum)

___

### name

• `Optional` `Readonly` **name**: `string`

Name of the form field.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[name](types_Model.ContainerModel.md#name)

___

### parent

• **parent**: [`ContainerModel`](types_Model.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[parent](types_Model.ContainerModel.md#parent)

___

### pattern

• `Optional` **pattern**: `string`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[pattern](types_Model.ContainerModel.md#pattern)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder to show on the widget.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[placeholder](types_Model.ContainerModel.md#placeholder)

___

### props

• `Optional` **props**: `Object`

Custom properties of the form field.

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[props](types_Model.ContainerModel.md#props)

___

### readOnly

• `Optional` **readOnly**: `boolean`

Whether the field should be readOnly to end user or not.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[readOnly](types_Model.ContainerModel.md#readonly)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[required](types_Model.ContainerModel.md#required)

___

### rules

• `Optional` **rules**: `Object`

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[rules](types_Model.ContainerModel.md#rules)

___

### title

• `Readonly` **title**: `string`

Form title.

___

### type

• `Optional` **type**: `string`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[type](types_Model.ContainerModel.md#type)

___

### valid

• `Optional` **valid**: `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[valid](types_Model.ContainerModel.md#valid)

___

### value

• **value**: `any`

The current value of the Field. The property is serialized in the Data Model.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[value](types_Model.ContainerModel.md#value)

___

### viewType

• `Readonly` **viewType**: `string`

Type of widget to show to the user for capturing the data..

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[viewType](types_Model.ContainerModel.md#viewtype)

___

### visible

• `Optional` **visible**: `boolean`

Whether the field should be visible to author or not.

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[visible](types_Model.ContainerModel.md#visible)

## Methods

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[dispatch](types_Model.ContainerModel.md#dispatch)

___

### exportData

▸ **exportData**(): `any`

Exports the form data

#### Returns

`any`

___

### getElement

▸ **getElement**(`id`): [`FormModel`](types_Model.FormModel.md) \| [`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md)

Get form element model based on the id of the form element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the form element |

#### Returns

[`FormModel`](types_Model.FormModel.md) \| [`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md)

___

### getState

▸ **getState**(): `T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Returns

`T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Inherited from

WithContainerState.getState

___

### importData

▸ **importData**(`data`): `any`

Imports the given form data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | form data |

#### Returns

`any`

#### Overrides

ContainerModel.importData

___

### indexOf

▸ **indexOf**(`f`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md) |

#### Returns

`number`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[indexOf](types_Model.ContainerModel.md#indexof)

___

### subscribe

▸ **subscribe**(`callback`, `eventName?`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `callbackFn` |
| `eventName?` | `string` |

#### Returns

`Subscription`

#### Inherited from

[ContainerModel](types_Model.ContainerModel.md).[subscribe](types_Model.ContainerModel.md#subscribe)
