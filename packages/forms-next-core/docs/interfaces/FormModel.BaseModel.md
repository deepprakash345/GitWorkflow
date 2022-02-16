# Interface: BaseModel

[FormModel](../modules/FormModel.md).BaseModel

Generic base model interface.
Defines common properties that each form field should have

## Hierarchy

- [`ConstraintsJson`](../modules/FormJsonTypes.md#constraintsjson)

- `WithController`

  ↳ **`BaseModel`**

  ↳↳ [`FieldModel`](FormModel.FieldModel.md)

  ↳↳ [`ContainerModel`](FormModel.ContainerModel.md)

## Implemented by

- [`BaseNode`](../classes/BaseNode.BaseNode-1.md)

## Table of contents

### Properties

- [accept](FormModel.BaseModel.md#accept)
- [dataRef](FormModel.BaseModel.md#dataref)
- [default](FormModel.BaseModel.md#default)
- [description](FormModel.BaseModel.md#description)
- [enabled](FormModel.BaseModel.md#enabled)
- [enforceEnum](FormModel.BaseModel.md#enforceenum)
- [enum](FormModel.BaseModel.md#enum)
- [enumNames](FormModel.BaseModel.md#enumnames)
- [expression](FormModel.BaseModel.md#expression)
- [format](FormModel.BaseModel.md#format)
- [fracDigits](FormModel.BaseModel.md#fracdigits)
- [id](FormModel.BaseModel.md#id)
- [index](FormModel.BaseModel.md#index)
- [isContainer](FormModel.BaseModel.md#iscontainer)
- [items](FormModel.BaseModel.md#items)
- [label](FormModel.BaseModel.md#label)
- [leadDigits](FormModel.BaseModel.md#leaddigits)
- [maxFileSize](FormModel.BaseModel.md#maxfilesize)
- [maxItems](FormModel.BaseModel.md#maxitems)
- [maxLength](FormModel.BaseModel.md#maxlength)
- [maximum](FormModel.BaseModel.md#maximum)
- [minItems](FormModel.BaseModel.md#minitems)
- [minLength](FormModel.BaseModel.md#minlength)
- [minimum](FormModel.BaseModel.md#minimum)
- [name](FormModel.BaseModel.md#name)
- [parent](FormModel.BaseModel.md#parent)
- [pattern](FormModel.BaseModel.md#pattern)
- [placeholder](FormModel.BaseModel.md#placeholder)
- [props](FormModel.BaseModel.md#props)
- [readOnly](FormModel.BaseModel.md#readonly)
- [required](FormModel.BaseModel.md#required)
- [type](FormModel.BaseModel.md#type)
- [valid](FormModel.BaseModel.md#valid)
- [value](FormModel.BaseModel.md#value)
- [viewType](FormModel.BaseModel.md#viewtype)
- [visible](FormModel.BaseModel.md#visible)

### Methods

- [dispatch](FormModel.BaseModel.md#dispatch)
- [subscribe](FormModel.BaseModel.md#subscribe)

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

• `Optional` `Readonly` **items**: ([`FieldModel`](FormModel.FieldModel.md) \| [`FieldsetModel`](FormModel.FieldsetModel.md))[]

Array containing Fields or Panels.

___

### label

• `Optional` **label**: [`Label`](../modules/FormJsonTypes.md#label)

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

• `Readonly` **parent**: ``null`` \| [`ContainerModel`](FormModel.ContainerModel.md)

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
| `action` | [`Action`](FormModel.Action.md) |

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
