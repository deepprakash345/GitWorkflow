# Interface: BaseModel

[types/Model](../modules/types_Model.md).BaseModel

Generic base model interface.
Defines common properties that each form field should have

## Hierarchy

- [`ConstraintsJson`](../modules/types_Json.md#constraintsjson)

- `WithController`

  ↳ **`BaseModel`**

  ↳↳ [`FieldModel`](types_Model.FieldModel.md)

  ↳↳ [`ContainerModel`](types_Model.ContainerModel.md)

## Implemented by

- [`BaseNode`](../classes/BaseNode.BaseNode-1.md)

## Table of contents

### Properties

- [accept](types_Model.BaseModel.md#accept)
- [dataRef](types_Model.BaseModel.md#dataref)
- [default](types_Model.BaseModel.md#default)
- [description](types_Model.BaseModel.md#description)
- [enabled](types_Model.BaseModel.md#enabled)
- [enforceEnum](types_Model.BaseModel.md#enforceenum)
- [enum](types_Model.BaseModel.md#enum)
- [enumNames](types_Model.BaseModel.md#enumnames)
- [expression](types_Model.BaseModel.md#expression)
- [format](types_Model.BaseModel.md#format)
- [fracDigits](types_Model.BaseModel.md#fracdigits)
- [id](types_Model.BaseModel.md#id)
- [index](types_Model.BaseModel.md#index)
- [isContainer](types_Model.BaseModel.md#iscontainer)
- [items](types_Model.BaseModel.md#items)
- [label](types_Model.BaseModel.md#label)
- [leadDigits](types_Model.BaseModel.md#leaddigits)
- [maxFileSize](types_Model.BaseModel.md#maxfilesize)
- [maxItems](types_Model.BaseModel.md#maxitems)
- [maxLength](types_Model.BaseModel.md#maxlength)
- [maximum](types_Model.BaseModel.md#maximum)
- [minItems](types_Model.BaseModel.md#minitems)
- [minLength](types_Model.BaseModel.md#minlength)
- [minimum](types_Model.BaseModel.md#minimum)
- [name](types_Model.BaseModel.md#name)
- [parent](types_Model.BaseModel.md#parent)
- [pattern](types_Model.BaseModel.md#pattern)
- [placeholder](types_Model.BaseModel.md#placeholder)
- [props](types_Model.BaseModel.md#props)
- [readOnly](types_Model.BaseModel.md#readonly)
- [required](types_Model.BaseModel.md#required)
- [type](types_Model.BaseModel.md#type)
- [valid](types_Model.BaseModel.md#valid)
- [value](types_Model.BaseModel.md#value)
- [viewType](types_Model.BaseModel.md#viewtype)
- [visible](types_Model.BaseModel.md#visible)

### Methods

- [dispatch](types_Model.BaseModel.md#dispatch)
- [subscribe](types_Model.BaseModel.md#subscribe)

## Properties

### accept

• `Optional` **accept**: `string`[]

#### Inherited from

ConstraintsJson.accept

___

### dataRef

• `Optional` `Readonly` **dataRef**: ``null`` \| `string`

To map the field’s value to a property in the data model.

___

### default

• `Optional` `Readonly` **default**: `any`

Default value of the Field.

___

### description

• `Optional` **description**: `string`

Extra description to be shown to the user to aid in form filling experience. It can be rich text.

___

### enabled

• `Optional` **enabled**: `boolean`

Whether the field is enabled and takes part in rules, events etc.

___

### enforceEnum

• `Optional` **enforceEnum**: `boolean`

#### Inherited from

ConstraintsJson.enforceEnum

___

### enum

• `Optional` **enum**: `any`[]

#### Inherited from

ConstraintsJson.enum

___

### enumNames

• `Optional` **enumNames**: `string`[]

#### Inherited from

ConstraintsJson.enumNames

___

### expression

• `Optional` **expression**: `string`

#### Inherited from

ConstraintsJson.expression

___

### format

• `Optional` **format**: `string`

#### Inherited from

ConstraintsJson.format

___

### fracDigits

• `Optional` **fracDigits**: `number`

#### Inherited from

ConstraintsJson.fracDigits

___

### id

• `Readonly` **id**: `string`

Unique id of the form field.

___

### index

• `Readonly` **index**: `number`

The index of the Field within its parent.

___

### isContainer

• `Readonly` **isContainer**: `boolean`

Whether the form field is container or not

___

### items

• `Optional` `Readonly` **items**: ([`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md))[]

Array containing Fields or Panels.

___

### label

• `Optional` **label**: [`Label`](../modules/types_Json.md#label)

Label to be used for the field.

___

### leadDigits

• `Optional` **leadDigits**: `number`

#### Inherited from

ConstraintsJson.leadDigits

___

### maxFileSize

• `Optional` **maxFileSize**: `number`

#### Inherited from

ConstraintsJson.maxFileSize

___

### maxItems

• `Optional` **maxItems**: `number`

#### Inherited from

ConstraintsJson.maxItems

___

### maxLength

• `Optional` **maxLength**: `number`

#### Inherited from

ConstraintsJson.maxLength

___

### maximum

• `Optional` **maximum**: `number`

#### Inherited from

ConstraintsJson.maximum

___

### minItems

• `Optional` **minItems**: `number`

#### Inherited from

ConstraintsJson.minItems

___

### minLength

• `Optional` **minLength**: `number`

#### Inherited from

ConstraintsJson.minLength

___

### minimum

• `Optional` **minimum**: `number`

#### Inherited from

ConstraintsJson.minimum

___

### name

• `Optional` `Readonly` **name**: `string`

Name of the form field.

___

### parent

• `Readonly` **parent**: ``null`` \| [`ContainerModel`](types_Model.ContainerModel.md)

The Parent Panel of the Field/Panel.

___

### pattern

• `Optional` **pattern**: `string`

#### Inherited from

ConstraintsJson.pattern

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder to show on the widget.

___

### props

• `Optional` **props**: `Object`

Custom properties of the form field.

#### Index signature

▪ [key: `string`]: `any`

___

### readOnly

• `Optional` **readOnly**: `boolean`

Whether the field should be readOnly to end user or not.

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

ConstraintsJson.required

___

### type

• `Optional` **type**: `string`

#### Inherited from

ConstraintsJson.type

___

### valid

• `Optional` **valid**: `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

___

### value

• **value**: `any`

The current value of the Field. The property is serialized in the Data Model.

___

### viewType

• `Readonly` **viewType**: `string`

Type of widget to show to the user for capturing the data..

___

### visible

• `Optional` **visible**: `boolean`

Whether the field should be visible to author or not.

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

WithController.dispatch

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

WithController.subscribe
